import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';

import Image from 'next/image';
import { Button } from '@components/inc/Button';

export const NotLoaded = () => {
    const { push } = useRouter();
    const { user } = useAuth();

    const handleRedirect = () => {
        if (!user) return;

        push(`/profile/${user.id}`);
    };

    return (
        <div className="w-full max-w-[500px] h-screen flex flex-col justify-center items-center mx-auto">
            <Image width={112} height={112} src="/img/not_available.svg" alt="Page is not available" />

            <span className="text-xl text-light-100 font-bold text-center mt-2">Ease down!</span>
            <span className="text-lg text-light-100 text-center">
                You are too fast for our servers, wait for network requests ;)
            </span>

            <Button
                title={user ? 'Go to profile page' : 'Waiting...'}
                callback={handleRedirect}
                styles="w-[300px] mt-8"
            />
        </div>
    );
};
