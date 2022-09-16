/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full absolute bottom-1 left-1 text-sm text-light-100">
            <Link href="https://github.com/CubeStorm/">
                <a target="_blank" className="hover:underline">
                    CubeStorm
                </a>
            </Link>
            &nbsp;· No-Meta © {year}
        </footer>
    );
};
