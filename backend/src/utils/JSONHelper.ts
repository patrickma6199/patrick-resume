import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export class JSONHelper {
    /**
     * Reads a JSON file and parses its contents.
     * @param filePath - The path to the JSON file.
     * @returns Parsed JSON object.
     * @throws Error if the file cannot be read or parsed.
     */
    static readJson(filePath: string): any {
        try {

            const absolutePath = path.resolve(__dirname, filePath);
            const fileContents = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(fileContents);
        } catch (error: any) {
            throw new Error(`Failed to read JSON file at ${filePath}: ${error.message}`);
        }
    }

    /**
     * Writes a JSON object to a file.
     * @param filePath - The path to the JSON file.
     * @param data - The JSON object to write.
     * @throws Error if the file cannot be written.
     */
    static writeJson(filePath: string, data: any): void {
        try {
            const absolutePath = path.resolve(__dirname, filePath);
            fs.writeFileSync(absolutePath, JSON.stringify(data, null, 4), 'utf-8');
        } catch (error: any) {
            throw new Error(`Failed to write JSON file at ${filePath}: ${error.message}`);
        }
    }

    /**
     * Checks if a JSON file exists at the specified path.
     * @param filePath - The path to the JSON file.
     * @returns `true` if the file exists, otherwise `false`.
     */
    static jsonFileExists(filePath: string): boolean {
        try {
            const absolutePath = path.resolve(__dirname, filePath);
            return fs.existsSync(absolutePath);
        } catch (error: any) {
            throw new Error(`Failed to check if JSON file exists at ${filePath}: ${error.message}`);
        }
    }
}
