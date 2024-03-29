interface SwitchFormProps {
    isLoginFormActive: boolean;
    toggleForm: () => void;
}

export const SwitchForm = ({ isLoginFormActive, toggleForm }: SwitchFormProps) => {
    const label = isLoginFormActive ? 'Show register form' : 'Show login form';

    return (
        <button aria-label={label} className="w-full text-center" onClick={toggleForm}>
            <span className="text-sm text-center text-light-200 hover:underline">
                {isLoginFormActive ? (
                    <>
                        <span className="block">Don&apos;t have an account?</span>
                        <span className="block">Register</span>
                    </>
                ) : (
                    <>
                        <span className="block">Have an account?</span>
                        <span className="block">Login</span>
                    </>
                )}
            </span>
        </button>
    );
};
