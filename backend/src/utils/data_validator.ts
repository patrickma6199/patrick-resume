import dbHelper, {IFileType} from './db_helper';

export default class dataValidator {
    // General type checks for request data
    static checkBoolean = (bool: any) => bool != null && Boolean(bool) == bool;
    static checkNumber = (number: any) => number != null && !isNaN(number);
    static checkDate = (date: any) =>
        date != null && new Date(date).toString() != 'Invalid Date';
    static checkArray = (array: any) => array != null && Array.isArray(array);
    static checkObject = (object: any) =>
        object != null && object.constructor == Object;
    static checkString = (string: any) =>
        string != null && string.constructor == String;
    static checkStringIsNotEmpty = (string: any) =>
        this.checkString(string) && string.trim() != '';

    /**
     * @namespace checkSubmissionValid
     * @description Determines if a submission is valid depending on the assignment's allowed types
     * @param extension Submission file extension
     * @param mime Submission mime type
     * @param assignmentId Assignment identifier for submission
     * @returns {boolean}
     */
    static async checkSubmissionValid(
        extension: string,
        mime: string,
        assignmentId: number,
    ): Promise<boolean> {
        const allowedSubmissionType =
            await dbHelper.getAllowedSubmissionTypes(assignmentId);
        if (allowedSubmissionType) {
            return dataValidator.checkIfMatchingFileTypeExists(
                extension,
                mime,
                allowedSubmissionType.fileTypes,
            );
        } else {
            return false;
        }
    }

    /**
     * @namespace checkIfMatchingFileTypeExists
     * @description Check if the file extension and MIME type matches any of the specified file types in the list
     * @param fileExt The file extension being checked
     * @param fileMime The file MIME type being checked
     * @param fileTypes The list of file types to check against
     * @returns {boolean}
     */
    static checkIfMatchingFileTypeExists(
        fileExt: string,
        fileMime: string,
        fileTypes: IFileType[],
    ) {
        const extExists = fileTypes.some(
            f => f.ext.toLowerCase() === fileExt.toLowerCase(),
        );
        const mimeExists = fileTypes.some(
            f => f.mime.toLowerCase() === fileMime.toLowerCase(),
        );
        return extExists && mimeExists;
    }

    // Image specific utility functions and variables
    static viableFileTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
        'image/gif',
        'image/svg+xml',
        'image/tiff',
    ];

    /**
     * @namespace checkIfValidImageMIME
     * @description Check if the MIME type of a file is a valid image MIME type for sharp
     * @param fileType The MIME type of the file
     * @returns {boolean}
     */
    static isValidImageMIME(fileType: string): boolean {
        return this.viableFileTypes.includes(fileType);
    }
}
