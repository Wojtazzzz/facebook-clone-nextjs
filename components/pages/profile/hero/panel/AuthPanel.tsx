import { Button } from '@components/inc/Button';

export const AuthPanel = () => {
    return (
        <div className="w-full flex justify-end items-end gap-4 mt-5 md:mt-0 mr-6">
            <Button title="Edit profile" styles="w-[130px] xl:w-[155px]" isDisabled />;
        </div>
    );
};
