import {jest} from '@jest/globals';

type syncFn = (...args: any[]) => any | null;
type asyncFn = (...args: any[]) => Promise<any>;

const getUserFromTokenMock = jest.fn<asyncFn>();
const getTokensFromCookiesMock = jest.fn<syncFn>();
const getAdminFromTokenMock = jest.fn<asyncFn>();

export const authHelperMock = {
    getUserFromToken: getUserFromTokenMock,
    getTokensFromCookies: getTokensFromCookiesMock,
    getAdminFromToken: getAdminFromTokenMock,
};

const isInCourseMock = jest.fn<asyncFn>();
const isCourseInstructorMock = jest.fn<asyncFn>();
const getPreviousSubmissionMock = jest.fn<asyncFn>();

export const dbHelperMock = {
    isInCourse: isInCourseMock,
    isCourseInstructor: isCourseInstructorMock,
    getPreviousSubmission: getPreviousSubmissionMock,
};
