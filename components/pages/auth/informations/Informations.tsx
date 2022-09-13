import { Github } from './Github';
import { Header } from '../inc/Header';
import { About } from './About';

export const Informations = () => {
    return (
        <section className="w-full md:w-1/2 md:pt-8">
            <div className="hidden md:block">
                <Header />
            </div>

            <aside>
                <About />
                <Github />
            </aside>
        </section>
    );
};
