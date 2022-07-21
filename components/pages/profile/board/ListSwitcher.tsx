import type { ChangeEvent } from 'react';

interface ListSwitcherProps {
    changePostsList: (value: string) => void;
}

export const ListSwitcher = ({ changePostsList }: ListSwitcherProps) => {
    const handleChangePostsList = (event: ChangeEvent<HTMLSelectElement>) => {
        changePostsList(event.target.value);
    };

    return (
        <div className="w-full flex justify-end items-center">
            <select
                name="list"
                className="w-full text-light-50 bg-dark-100 rounded-lg border-x-[12px] border-transparent transition-all hover:brightness-110 py-3"
                onChange={handleChangePostsList}
            >
                <option value="OWN" selected>
                    Own posts
                </option>
                <option value="HIDDEN">Hidden posts</option>
                <option value="SAVED">Saved posts</option>
            </select>
        </div>
    );
};
