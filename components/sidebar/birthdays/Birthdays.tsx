import { SectionHeader } from '../SectionHeader';
import { Content } from './content/Content';

export const Birthdays = () => {
    return (
        <section data-testid="birthdays" className="w-full border-b-[1px] border-dark-100 mb-2 py-4">
            <SectionHeader title="Birthdays" />
            <Content />
        </section>
    );
};
