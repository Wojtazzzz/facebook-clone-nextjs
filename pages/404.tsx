import { useRouter } from 'next/router';

import Image from 'next/image';
import { Button } from '@components/Button';

export default function Custom404() {
    const { push } = useRouter();

    const handleRedirect = () => push('/');

    return (
        <div className="w-full max-w-[500px] h-screen flex flex-col justify-center items-center mx-auto">
            <Image width={112} height={112} src="/img/not_available.svg" alt="Page is not available" />

            <span className="text-lg text-light-100 font-bold text-center mt-2">This page isn&apos;t available</span>
            <span className="text-base text-light-100 text-center">
                The link may be broken, or the page may have been removed. Check to see if the link you&apos;re trying
                to open is correct.
            </span>

            <Button title="Go to Home Page" callback={handleRedirect} styles="w-[300px] mt-8" />
        </div>
    );
}
