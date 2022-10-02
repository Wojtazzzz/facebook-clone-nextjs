import { Github } from './Github';
import { Header } from '../inc/Header';
import { About } from './About';

export const Informations = () => {
    return (
        <section aria-label="About application" className="w-full md:w-1/2 md:pt-8">
            <Header />

            <aside>
                <About />
                <Github />
            </aside>
        </section>
    );
};
