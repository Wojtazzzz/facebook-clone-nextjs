interface InputProps {
    label: string;
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder?: string;
}

export const Input = ({ label, type, name, placeholder }: InputProps) => {
    return (
        <input
            type={type}
            name={name}
            value=""
            placeholder={placeholder ?? label}
            aria-label={label}
            disabled={true}
            className="tracking-wide bg-dark-200 focus:outline-none ring-2 ring-dark-100 focus:ring-primary rounded-md py-2 px-4 cursor-not-allowed text-dark-100 placeholder-light-100"
        />
    );
};
