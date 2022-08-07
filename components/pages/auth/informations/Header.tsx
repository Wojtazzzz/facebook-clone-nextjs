import { FacebookLogo } from '@components/inc/FacebookLogo';

export const Header = () => {
    return (
        <div className="flex items-center gap-4 mb-5">
            <FacebookLogo />

            <h1 className="text-4xl md:text-5xl text-primary font-bold">Facebook</h1>
        </div>
    );
};
