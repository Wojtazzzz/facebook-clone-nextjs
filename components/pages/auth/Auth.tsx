import { Informations } from '@components/pages/auth/Informations';
import { Form } from '@components/pages/auth/Form';

export const Auth = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center gap-16">
            <Informations />
            <Form />
        </div>
    );
};
