import { Form } from './form/Form';

interface ContentProps {
    queryKey: unknown[];
}

export const Content = ({ queryKey }: ContentProps) => {
    return (
        <div className="p-4">
            <Form queryKey={queryKey} />
        </div>
    );
};
