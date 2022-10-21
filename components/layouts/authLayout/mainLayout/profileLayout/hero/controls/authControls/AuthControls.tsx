import { Button } from '@components/inc/Button';
import { Credentials } from './credentials/Credentials';

export const AuthControls = () => {
    return (
        <>
            <Credentials />
            <Button title="Edit profile" styles="w-[130px] xl:w-[155px]" isDisabled />
        </>
    );
};
