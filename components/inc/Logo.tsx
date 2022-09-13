import Image from 'next/image';
import FacebookLogo from '../../public/img/logo.webp';

interface LogoProps {
    size: number | string;
}
export const Logo = ({ size }: LogoProps) => {
    return (
        <div className="flex justify-center items-center">
            <Image width={size} height={size} src={FacebookLogo} alt="Facebook" />
        </div>
    );
};
