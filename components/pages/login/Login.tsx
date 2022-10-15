import { Informations } from '@components/pages/login/informations/Informations';
import { Authorization } from '@components/pages/login/authorization/Authorization';

export const Login = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center md:items-start gap-8 md:gap-12 lg:gap-16">
            <Authorization />
            <Informations />
        </div>
    );
};
