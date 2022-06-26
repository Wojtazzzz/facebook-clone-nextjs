import type { FriendsListType } from '@ctypes/FriendsListType';

export const toCapitalizeCase = (name: FriendsListType) => {
    if (!name) {
        return 'Friends';
    }

    const string = name;

    const lowerCaseString = string.toLowerCase();
    const lowerCaseStringWithoutFirstChar = lowerCaseString.substring(1);
    const upperFirstChar = string.charAt(0).toUpperCase();

    const parsedString = upperFirstChar + lowerCaseStringWithoutFirstChar;

    return parsedString;
};
