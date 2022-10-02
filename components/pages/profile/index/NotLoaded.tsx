import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';
import Image from 'next/future/image';
import { Button } from '@components/inc/Button';

export const NotLoaded = () => {
    const { push } = useRouter();
    const { user } = useAuth();

    const handleRedirect = () => {
        if (!user) return;

        push(`/profile/${user.id}`);
    };

    return (
        <section aria-labelledby="notLoaded-heading" aria-describedby="notLoaded-content">
            <Image width={112} height={112} src="/img/not_available.svg" alt="Page is not available" />

            <h2 id="notLoaded-heading" className="text-xl text-light-100 font-bold text-center mt-2">
                Ease down!
            </h2>

            <span id="notLoaded-content" className="text-lg text-light-100 text-center">
                You are too fast for our app, wait for network requests ;)
            </span>

            <Button
                title={user ? 'Go to profile page' : 'Waiting...'}
                isDisabled={!user}
                styles="w-[300px] mt-8"
                callback={handleRedirect}
            />
        </section>
    );
};
