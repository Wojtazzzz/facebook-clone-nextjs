import { Logo } from '@components/inc/Logo';

export const Header = () => {
    return (
        <header className="hidden md:flex items-center gap-4 mb-5">
            <Logo size={64} />

            <h1 className="text-3xl md:text-4xl xl:test-5xl text-primary font-bold">Facebook</h1>
        </header>
    );
};
