import {
    faBriefcase,
    faClock,
    faGraduationCap,
    faHeart,
    faHome,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import { Container } from '../inc/Container';
import { Header } from '../inc/Header';
import { Info } from './Info';

interface IntroProps {
    created_at: string;
    works_at?: string;
    went_to?: string;
    lives_in?: string;
    from?: string;
    marital_status?: string;
}

export const Intro = ({ works_at, went_to, lives_in, from, created_at, marital_status }: IntroProps) => {
    return (
        <Container testId="asideInfo-intro">
            <Header title="Intro" />

            <ul className="flex flex-col gap-2">
                {works_at && <Info icon={faBriefcase} label="Works at" title="Works at" info={works_at} />}
                {went_to && <Info icon={faGraduationCap} label="Went to" title="Went to" info={went_to} />}
                {lives_in && <Info icon={faHome} label="Lives in" title="Lives in" info={lives_in} />}
                {from && <Info icon={faLocationPin} label="From" title="From" info={from} />}
                <Info icon={faClock} label="Joined on" title="Joined on" info={created_at} />
                {marital_status && <Info icon={faHeart} label="Marital status" title={marital_status} />}
            </ul>
        </Container>
    );
};
