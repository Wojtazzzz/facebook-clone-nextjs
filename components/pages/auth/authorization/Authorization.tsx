import { useState } from 'react';
import { Login } from '@components/pages/auth/authorization/login/Login';
import { Register } from '@components/pages/auth/authorization/register/Register';
import { SwitchFormButton } from './SwitchFormButton';

export const Authorization = () => {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);
    const handleToggleForm = () => setIsLoginFormActive((prevState) => !prevState);

    return (
        <div className="w-full md:w-1/2 max-w-[400px] bg-dark-200 rounded-lg shadow-md p-4 md:p-5 lg:p-7">
            {isLoginFormActive ? <Login /> : <Register />}

            <div className="h-px bg-dark-100 mt-7 mb-3"></div>

            <SwitchFormButton isLoginFormActive={isLoginFormActive} toggleForm={handleToggleForm} />
        </div>
    );
};
