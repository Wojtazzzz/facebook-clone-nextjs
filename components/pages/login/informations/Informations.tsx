import { Github } from './Github';
import { Header } from './Header';
import { About } from './About';

export const Informations = () => {
    return (
        <aside aria-label="About application" className="w-full md:w-1/2 md:pt-8">
            <Header />

            <About />
            <Github />
        </aside>
    );
};
