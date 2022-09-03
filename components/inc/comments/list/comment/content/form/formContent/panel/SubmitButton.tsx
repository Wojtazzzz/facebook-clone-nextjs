import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';

interface SubmitButtonProps {
    isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
    if (isLoading) {
        return <SpinnerLoader testId="commentUpdateButton-loader" containerStyles="w-[25px] h-[25px]" />;
    }

    return (
        <button type="submit" aria-label="Update comment">
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    );
};
