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
            <select name="list" onChange={handleChangePostsList}>
                <option value="OWN" selected>
                    Own
                </option>
                <option value="HIDDEN">Hidden</option>
                <option value="SAVED">Saved</option>
            </select>
        </div>
    );
};
