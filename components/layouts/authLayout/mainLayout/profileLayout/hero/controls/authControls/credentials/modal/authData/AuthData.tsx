import { ApiError } from '@components/inc/ApiError';
import { Loader } from './Loader';
import { SingleValue } from './SingleValue';
import { useGetUserEmail } from './useGetUserEmail';

export const AuthData = () => {
    const { data: email, isLoading, isError } = useGetUserEmail();

    if (isLoading) return <Loader />;
    if (!email || isError) return <ApiError />;

    return (
        <div className="flex flex-col gap-1 m-4 ">
            <SingleValue name="Email" value={email} />
            <SingleValue name="Password" value="password" />
        </div>
    );
};
