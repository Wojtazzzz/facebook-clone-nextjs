import { ValidationError } from '@components/inc/ValidationError';

export const ValidationErrors = () => {
    return (
        <div className="w-full pl-2">
            <ValidationError size="xs" fieldName="content" />
        </div>
    );
};
