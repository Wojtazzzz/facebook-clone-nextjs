import { Informations } from '@components/pages/auth/informations/Informations';
import { Authorization } from '@components/pages/auth/authorization/Authorization';

export const Auth = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-16">
            <Authorization />
            <Informations />
        </div>
    );
};
