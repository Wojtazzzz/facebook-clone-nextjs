import Image from 'next/future/image';
import BornImg from '../../../../../../public/img/bornImg.png';

interface DateProps {
    date: string;
}

export const Date = ({ date }: DateProps) => {
    return (
        <div className="w-full flex flex-col items-center gap-3 text-dark-100 my-3 md:my-6">
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center relative bg-primary rounded-full shadow-[0_0_0_4px_rgb(58,59,60)]">
                <Image
                    data-testid="born-img"
                    fill
                    sizes="(max-width: 640px) 30px, 40px"
                    src={BornImg}
                    alt=""
                    className="w-full h-full p-[10px]"
                />
            </div>

            <span className="md:text-lg lg:text-xl text-light-50">Born on {date}</span>
        </div>
    );
};
