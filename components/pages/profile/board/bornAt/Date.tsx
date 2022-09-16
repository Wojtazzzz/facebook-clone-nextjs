import Image from 'next/image';
import BornImg from '../../../../../public/img/bornImg.png';

interface DateProps {
    date: string;
}

export const Date = ({ date }: DateProps) => {
    return (
        <div className="w-full flex flex-col items-center gap-3 text-dark-100">
            <div className="w-[40px] h-[40px] flex justify-center items-center bg-primary rounded-full shadow-[0_0_0_4px_rgb(58,59,60)]">
                <Image data-testid="born-img" objectFit="fill" src={BornImg} alt="" />
            </div>

            <span className="text-xl text-light-50">Born on {date}</span>
        </div>
    );
};
