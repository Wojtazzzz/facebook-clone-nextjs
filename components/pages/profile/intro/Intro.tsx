import {
    faBriefcase,
    faClock,
    faGraduationCap,
    faHeart,
    faHome,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import { Info } from '@components/pages/profile/intro/Info';

interface IntroProps {
    works_at?: string;
    went_to?: string;
    lives_in?: string;
    from?: string;
    created_at: string;
    marital_status?: string;
}

export const Intro = ({ works_at, went_to, lives_in, from, created_at, marital_status }: IntroProps) => {
    return (
        <section
            data-testid="profile-intro"
            aria-label="User info"
            className="w-2/6 bg-dark-200 shadow-sm rounded-lg p-4"
        >
            <h5 className="text-xl text-light-200 font-bold">Intro</h5>

            <div className="flex flex-col mt-3 gap-2">
                {works_at && <Info icon={faBriefcase} title="Works at" info={works_at} />}
                {went_to && <Info icon={faGraduationCap} title="Went to" info={went_to} />}
                {lives_in && <Info icon={faHome} title="Lives in" info={lives_in} />}
                {from && <Info icon={faLocationPin} title="From" info={from} />}
                <Info icon={faClock} title="Joined on" info={created_at} />
                {marital_status && <Info icon={faHeart} title={marital_status} />}
            </div>
        </section>
    );
};
