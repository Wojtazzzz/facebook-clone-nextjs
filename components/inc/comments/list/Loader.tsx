import { SpinnerLoader } from '@components/inc/SpinnerLoader';

export const Loader = () => {
    return (
        <div data-testid="postsCommentsList-loading_loader" className="w-full flex justify-center py-2">
            <SpinnerLoader spinnerStyles="w-6" />
        </div>
    );
};
