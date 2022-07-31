import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

export const GlobalMenu = () => {
    return (
        <div className="border-t-[1px] border-dark-200 mt-2 pt-2">
            <Option title="Report" icon={faWarning} isDisabled />
        </div>
    );
};
