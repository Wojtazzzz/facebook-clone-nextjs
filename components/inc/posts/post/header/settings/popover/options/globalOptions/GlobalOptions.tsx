import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME } from '@utils/env';
import { Option } from '../Option';

export const GlobalOptions = () => {
    const handleReport = () => alert(`${APP_NAME} doesn't have support yet :(`);

    return (
        <div className="border-t-[1px] border-dark-200 mt-1 pt-1">
            <Option title="Report" icon={faWarning} isDisabled callback={handleReport} />
        </div>
    );
};
