import fs from 'fs';
import path from 'path';
import {IS_PRODUCTION, STORE_DIR} from '../env';
import archiver from 'archiver';

const backupData = async (): Promise<void> => {
    if (IS_PRODUCTION != 'true' || STORE_DIR == undefined) {
        console.log(
            'Backup skipped because the environment is not production or because STORE_DIR was not defined.',
        );
        return;
    }
    console.log('Starting backup...');

    const currentDate = new Date().toISOString().slice(0, 10);
    const sourceDir = STORE_DIR;
    const tempBackupDir = '/tempStoreBackups'; // Temporary directory to store the backup before zipping to avoid conflicts if student submits at the same time
    const backupDir = '/storeBackups'; // Directory to store the zipped backup (should be mounted in production)
    const zipFileName = `backup-${currentDate}.zip`;
    const zipFilePath = path.join(backupDir, zipFileName);

    // Create backup directories if either doesn't exist
    fs.mkdirSync(backupDir, {recursive: true});
    fs.mkdirSync(tempBackupDir, {recursive: true});

    fs.cpSync(sourceDir, tempBackupDir, {recursive: true});

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
        zlib: {level: 9}, // Highest compression level: Slower to compress but smaller file size
    });

    output.on('close', () => {
        // Cleanup temp backup directory
        fs.rmSync(tempBackupDir, {recursive: true});
        console.log('Temporary backup directory deleted successfully!');

        // Delete last one if there are more than 10 backups
        const files = fs.readdirSync(backupDir);

        if (files.length > 10) {
            const sortedFiles = files
                .map(file => ({
                    name: file,
                    time: new Date(file.split('-')[1].split('.')[0]).getTime(),
                }))
                .sort((a, b) => b.time - a.time); // Sort by time in descending order

            fs.rmSync(
                path.join(backupDir, sortedFiles[sortedFiles.length - 1].name),
            ); // Delete the oldest backup
            console.log('Deleted oldest backup successfully!');
        }

        console.log(
            `Backup zipped successfully! Total bytes: ${archive.pointer() / 1024}kB`,
        );
    });

    archive.on('error', (err: any) => {
        throw err;
    });

    archive.pipe(output);

    const appendFilesToArchive = (dir: string, callback: () => void) => {
        fs.readdir(dir, {withFileTypes: true}, (err, entries) => {
            if (err) throw err;

            let pending = entries.length;
            if (!pending) return callback(); // run callback if no files to append when first called

            entries.forEach(entry => {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    // Recursively append subdirectories
                    appendFilesToArchive(fullPath, () => {
                        if (!--pending) callback();
                    });
                } else {
                    // Append files
                    archive.file(fullPath, {
                        name: path.relative(tempBackupDir, fullPath),
                    });
                    if (!--pending) callback(); // Call done if no more files left after this one
                }
            });
        });
    };

    appendFilesToArchive(tempBackupDir, () => {
        // Finalize the archive after processing the directory
        archive.finalize();
    });
};

export default backupData;
