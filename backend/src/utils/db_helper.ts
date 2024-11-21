/**
 * TODO: Potentially add new checks for if a student is able to retrieve particular submissions
 * Currently, this is just used to check that a valid token is sent with the request (user is logged in)
 */

import mysql, {Connection, RowDataPacket} from 'mysql2/promise';
import {MYSQL_DB, MYSQL_HOST, MYSQL_USER, MYSQL_USER_PW} from '../env';

interface User {
    userId: number;
    role: string;
    avatarLocation: string;
}

interface Administrator {
    adminId: number;
    userName: string;
    emailAddress: string;
    phoneNumber: string;
}

export interface IFileType {
    ext: string;
    mime: string;
    name?: string;
}

export interface AllowedSubmissionType {
    allowURL: boolean;
    allowFile: boolean;
    domains: string[];
    fileTypes: IFileType[];
}

export default class dbHelper {
    static DB: Connection;

    /**
     * @namespace createDBConnection
     * @description Helper function for creating and connecting a mysql.Connection object for use
     * in database queries in the authentication service.
     * @returns mysql.Connection object for the application's database.
     */
    static async createDbConnection() {
        await mysql
            .createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_USER_PW,
                database: MYSQL_DB,
            })
            .then(connection => {
                this.DB = connection;
            })
            .catch(error => {
                console.error(`Error: ${error}\nRetrying in 5 seconds...`);
                setTimeout(() => this.createDbConnection(), 5000);
            });

        await this.intervalConnect();

        return this.DB;
    }

    /**
     * @namespace intervalConnect
     * @description A wrapper function for repeatedly attempting to connect to database
     * with 5 second intervals.
     * @returns {void}
     */
    static async intervalConnect() {
        if (!this.DB) {
            console.error(
                'Error: No database connection found while attempting to connect...',
            );
            return;
        }
        await this.DB.connect()
            .then(() => console.log('Connected to database'))
            .catch(error => {
                console.error(`Error: ${error}\nRetrying in 5 seconds...`);
                setTimeout(() => this.intervalConnect(), 5000);
            });
    }

    /**
     * @namespace getDBConnection
     * @description Wrapper function for getting the mysql.Connection object
     * for database interactions.
     * @returns mysql.Connection object for the application's database.
     */
    static async getDbConnection() {
        if (!this.DB) {
            return await this.createDbConnection();
        } else {
            try {
                await this.DB.ping();
            } catch (error: any) {
                this.DB = await this.createDbConnection();
            }
        }
        return this.DB;
    }

    /**
     * @namespace findUserByEmail
     * @description Helper function for retrieving user data using their
     * email.
     * @param email The email of the user.
     * @returns object representation of user with required fields.
     */
    static async findUserByEmail(
        email: string,
    ): Promise<User | null | undefined> {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                'SELECT userId, role, avatarLocation FROM User WHERE emailAddress = ?;',
                [email],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    const match = rows[0];
                    return {
                        userId: match.userId as number,
                        role: match.role as string,
                        avatarLocation: match.avatarLocation as string,
                    };
                }
            })
            .catch(error => {
                console.error(error.stack);
                return null;
            });
    }

    /**
     * @namespace findUserById
     * @description Helper function for retrieving user data using their
     * userId.
     * @param userId The userId of the user.
     * @returns object representation of user with required fields.
     */
    static async findUserById(
        userId: number,
    ): Promise<User | null | undefined> {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                'SELECT userId, role, avatarLocation FROM User WHERE userId = ?;',
                [userId],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    const match = rows[0];
                    return {
                        userId: match.userId as number,
                        role: match.role as string,
                        avatarLocation: match.avatarLocation as string,
                    };
                }
            })
            .catch(error => {
                console.error(error.stack);
                return null;
            });
    }

    /**
     * @namespace findAdminByUsername
     * @description Helper function for retrieving admin user data from their username.
     * @param username The username of admin.
     * @returns object representation of admin with required fields.
     */
    static async findAdminByUsername(
        username: string,
    ): Promise<Administrator | null | undefined> {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                'SELECT * FROM Administrator WHERE userName = ?;',
                [username],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    const match = rows[0];
                    return {
                        adminId: match.adminId as number,
                        userName: match.userName as string,
                        emailAddress: match.emailAddress as string,
                        phoneNumber: match.phoneNumber as string,
                    };
                }
            })
            .catch(error => {
                console.error(error.stack);
                return null;
            });
    }

    /**
     * @namespace isInCourse
     * @description Checks if the user is in the course.
     * @param email The email of the user.
     * @returns object representation of user with required fields.
     */
    static async isInCourse(userId: number, courseId: number) {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                `SELECT * FROM 
            Course c JOIN Enrollment e ON c.courseId = e.courseId 
            WHERE c.courseId = ? AND (c.instructorId = ? OR e.studentId = ?); `,
                [courseId, userId, userId],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    return true;
                }
                return false;
            })
            .catch(error => {
                console.error(error.stack);
                return false;
            });
    }

    /**
     * @namespace canSubmit
     * @description Checks if the user is in the course.
     * @returns object representation of user with required fields.
     * @param studentId
     * @param assignmentId
     * @param submissionId
     */
    static async canSubmit(
        studentId: number,
        assignmentId: number,
        submissionId: number,
    ) {
        const db = await this.getDbConnection();
        const isIndividual = await db
            .query<RowDataPacket[]>(
                `SELECT individual FROM Assignment a WHERE a.assignmentId = ?;`,
                [assignmentId],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    return undefined;
                }
                const firstMatch = rows[0];
                return {
                    individual: firstMatch.individual,
                };
            })
            .catch(error => {
                console.error(error.stack);
                return undefined;
            });
        if (isIndividual != undefined) {
            if (isIndividual.individual == 0) {
                // Group Assignment
                return await db
                    .query<RowDataPacket[]>(
                        `SELECT * FROM GroupSubmitter g WHERE g.studentId = ? AND g.submissionId = ?`,
                        [studentId, submissionId],
                    )
                    .then(([rows]) => {
                        return rows.length > 0;
                    })
                    .catch(error => {
                        console.error(error.stack);
                        return false;
                    });
            } else {
                return await db
                    .query<RowDataPacket[]>(
                        `SELECT * FROM Submitter s WHERE s.studentId = ? AND s.submissionId = ?`,
                        [studentId, submissionId],
                    )
                    .then(([rows]) => {
                        return rows.length > 0;
                    })
                    .catch(error => {
                        console.error(error.stack);
                        return false;
                    });
            }
        } else {
            return false;
        }
    }

    /**
     * @namespace isCourseInstructor
     * @description Checks if the user is the instructor of the course.
     * @param userId The userId of the user.
     * @param courseId The courseId of the course.
     * @returns boolean representation of if the user is the instructor of the course.
     */
    static async isCourseInstructor(userId: number, courseId: number) {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                'SELECT * FROM Course WHERE instructorId = ? AND courseId = ?;',
                [userId, courseId],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    return true;
                }
                return false;
            })
            .catch(error => {
                console.error(error.stack);
                return false;
            });
    }

    /**
     * @namespace getPreviousSubmission
     * @description Helper function for retrieving the previous submission of a student.
     * Mainly used for if there is a previous submission to delete
     * @param submissionId The userId of the student/group that made the submission.
     * @returns previous submission location.
     */
    static async getPreviousSubmission(submissionId: number) {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                'SELECT submissionLocation FROM Submission WHERE submissionId = ?;',
                [submissionId],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    return rows[0].submissionLocation as string;
                }
                return null;
            })
            .catch(error => {
                console.error(error.stack);
                return null;
            });
    }

    /**
     * @namespace getAllowedSubmissionTypes
     * @description Helper function for retrieving the allowed submission types for an assignment.
     * @param assignmentId The assignmentId of the assignment.
     * @returns object representation of allowed submission types.
     */
    static async getAllowedSubmissionTypes(
        assignmentId: number,
    ): Promise<AllowedSubmissionType | null> {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>(
                'SELECT allowedSubmissionTypes FROM Assignment WHERE assignmentId = ?;',
                [assignmentId],
            )
            .then(([rows]) => {
                if (rows.length > 0) {
                    return rows[0]
                        .allowedSubmissionTypes as AllowedSubmissionType;
                }
                return null;
            })
            .catch(error => {
                console.error(error.stack);
                return null;
            });
    }

    /**
     * @namespace getAllAvatarLocations
     * @description Helper function for retrieving all avatar locations.
     * @returns object representation of avatar locations.
     */
    static async getAllAvatarLocations(): Promise<string[] | null> {
        const db = await this.getDbConnection();
        return await db
            .query<RowDataPacket[]>('SELECT avatarLocation FROM User;', [])
            .then(([rows]) => {
                if (rows.length > 0) {
                    return rows.map(row => row.avatarLocation as string);
                }
                return null;
            })
            .catch(error => {
                console.error(error.stack);
                return null;
            });
    }
}
