import type { ChangeEvent } from 'react';
import type { IPostType } from '@utils/types';

interface ListSwitcherProps {
    userId: number;
    changeList: (queryKey: string[], value: string) => void;
}

export const ListSwitcher = ({ userId, changeList }: ListSwitcherProps) => {
    const endpoints = {
        OWN: `/api/users/${userId}/posts`,
        FRIEND: '/api/posts',
        HIDDEN: '/api/hidden/posts',
        SAVED: '/api/saved/posts',
    } as const;

    const handleChangeList = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (!isPostListType(value)) return;

        changeList([value, userId.toString()], endpoints[value]);
    };

    return (
        <div className="w-full flex justify-end items-center">
            <select
                aria-label="Change list of posts"
                name="list"
                defaultValue="OWN"
                className="w-full text-light-50 bg-dark-100 rounded-lg border-x-[12px] border-transparent transition-all hover:brightness-110 py-3"
                onChange={handleChangeList}
            >
                <option value="OWN">Own posts</option>
                <option value="HIDDEN">Hidden posts</option>
                <option value="SAVED">Saved posts</option>
            </select>
        </div>
    );
};

function isPostListType(value: string): value is IPostType {
    return ['OWN', 'FRIEND', 'HIDDEN', 'SAVED'].includes(value);
}
