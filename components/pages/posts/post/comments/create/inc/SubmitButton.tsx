import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';

interface SubmitButtonProps {
    isLoading: boolean;
    callback: () => void;
}

export const SubmitButton = ({ isLoading, callback }: SubmitButtonProps) => {
    if (isLoading) {
        return <SpinnerLoader testid="commentSubmitButton-loader" containerStyles="w-[25px] h-[25px]" />;
    }

    return (
        <button type="submit" aria-label="Submit comment" onClick={callback}>
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    );
};
