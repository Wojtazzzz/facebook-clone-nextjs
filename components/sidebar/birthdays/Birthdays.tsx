import { SectionHeader } from '../SectionHeader';
import { Content } from './content/Content';

export const Birthdays = () => {
    const headingId = 'sidebar-birthdays-heading';

    return (
        <section
            data-testid="birthdays"
            aria-labelledby={headingId}
            className="w-full border-b-[1px] border-dark-100 mb-2 py-4"
        >
            <SectionHeader headingId={headingId} title="Birthdays" />
            <Content />
        </section>
    );
};
