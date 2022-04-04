import Link from 'next/link';

export const Warning = () => {
    return (
        <Link href="http://onet.pl/">
            <a className="text-light-100 underline -my-1 ml-auto" target="_blank">
                Warning
            </a>
        </Link>
    );
};
