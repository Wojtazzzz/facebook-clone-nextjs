import {
    faBriefcase,
    faClock,
    faGraduationCap,
    faHeart,
    faHome,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import { Info } from '@components/pages/profile/asideInfo/intro/Info';
import { Container } from '../inc/Container';
import type { IUserProfile } from '@utils/types';
import { Header } from '../inc/Header';

interface IntroProps extends IUserProfile {}

export const Intro = ({ works_at, went_to, lives_in, from, created_at, marital_status }: IntroProps) => {
    return (
        <Container testId="asideInfo-intro">
            <Header title="Intro" />

            <ul className="flex flex-col gap-2">
                {works_at && <Info icon={faBriefcase} title="Works at" info={works_at} />}
                {went_to && <Info icon={faGraduationCap} title="Went to" info={went_to} />}
                {lives_in && <Info icon={faHome} title="Lives in" info={lives_in} />}
                {from && <Info icon={faLocationPin} title="From" info={from} />}
                <Info icon={faClock} title="Joined on" info={created_at} />
                {marital_status && <Info icon={faHeart} title={marital_status} />}
            </ul>
        </Container>
    );
};
