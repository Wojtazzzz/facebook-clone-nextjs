import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApiError } from './ApiError';
import { Empty } from './Empty';
import { useBirthdays } from './useBirthdays';
import { Users } from './users/Users';

export const Content = () => {
    const { data, isLoading, isError } = useBirthdays();

    if (isLoading) return <SpinnerLoader testId="birthdays-loader" spinnerStyles="w-5" />;
    if (isError) return <ApiError />;
    if (!data.length) return <Empty />;

    return (
        <div className="w-full flex items-center text-light-200 px-2">
            <FontAwesomeIcon icon={faBirthdayCake} className="text-3xl text-light-100 mr-3" />
            <Users birthdays={data} />
        </div>
    );
};
