import { Login } from '@components/pages/login/authorization/login/Login';
import { Register } from '@components/pages/login/authorization/register/Register';
import { SwitchForm } from './SwitchForm';
import { Header } from './Header';
import { useSwitchForm } from './useSwitchForm';

export const Authorization = () => {
    const { isLoginFormActive, toggleForm } = useSwitchForm();

    return (
        <div className="w-full md:w-1/2 max-w-[400px]">
            <Header />

            <div className="w-full bg-dark-200 rounded-lg shadow-md p-4 md:p-5 lg:p-7">
                {isLoginFormActive ? <Login /> : <Register />}

                <div className="h-px bg-dark-100 mt-7 mb-3"></div>

                <SwitchForm isLoginFormActive={isLoginFormActive} toggleForm={toggleForm} />
            </div>
        </div>
    );
};
