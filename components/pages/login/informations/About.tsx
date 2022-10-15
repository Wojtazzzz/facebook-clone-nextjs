export const About = () => {
    return (
        <span className="md:text-lg text-light-100 font-medium">
            Welcome to Surface App! This is noncommercial and nonofficial version of
            <a
                target="_blank"
                rel="noreferrer"
                data-testid="informations-facebook_link"
                href="https://facebook.com/"
                className="text-white hover:underline mx-1"
            >
                Facebook (open in new tab)
            </a>
            social app. For safety you cannot create account with own credentials. Instead of you can create free
            account with random data. Enjoy!
        </span>
    );
};
