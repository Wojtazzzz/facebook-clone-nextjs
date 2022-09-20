import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/chat/inc/Button';

export const SubmitMessage = () => {
    return <Button type="submit" label="Submit message" icon={faCircleCheck} />;
};
