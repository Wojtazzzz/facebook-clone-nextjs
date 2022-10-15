import Image from 'next/future/image';
import AppLogo from '../../public/img/Logo.svg';

interface LogoProps {
    size: number | string;
}

export const Logo = ({ size }: LogoProps) => {
    return (
        <div className="flex justify-center items-center">
            <Image width={size} height={size} src={AppLogo} alt={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
        </div>
    );
};
