import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FacebookLogo } from '@components/inc/FacebookLogo';

export const Informations = () => {
    return (
        <div className="w-full md:w-1/2 md:pt-8">
            <div className="flex items-center gap-4 mb-5">
                <FacebookLogo />
                <h1 className="text-4xl md:text-5xl text-primary font-bold">Facebook</h1>
            </div>

            <span className="md:text-lg text-light-100 font-medium">
                Welcome to Facebook-clone app! This is noncommercial and nonofficial version of
                <a
                    data-testid="informations-facebook_link"
                    href="https://facebook.com/"
                    className="text-primary hover:underline"
                >
                    Facebook
                </a>
                similar social app. For safety you cannot create account with own credentials. Instead of you can create
                free account with random data. Enjoy!
            </span>

            <div className="mt-10">
                <Link href="https://github.com/CubeStorm">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-24 h-24 flex justify-center items-center text-light-100 hover:text-light-200 border-2 border-light-100 hover:border-light-200 rounded-md transition-colors"
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-5xl" />
                    </a>
                </Link>
            </div>
        </div>
    );
};
