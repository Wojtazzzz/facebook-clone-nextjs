import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export const Github = () => {
    return (
        <div className="mt-10">
            <Link href="https://github.com/CubeStorm">
                <a
                    aria-label="Github repository"
                    data-testid="informations-github_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-24 h-24 flex justify-center items-center text-light-100 hover:text-light-200 border-2 border-light-100 hover:border-light-200 rounded-md transition-colors"
                >
                    <FontAwesomeIcon icon={faGithub} className="text-5xl" />
                </a>
            </Link>
        </div>
    );
};
