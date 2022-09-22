import { SearchEngine } from './searchEngine/SearchEngine';

export const DesktopSearch = () => {
    return (
        <div className="hidden sm:block">
            <SearchEngine />
        </div>
    );
};
