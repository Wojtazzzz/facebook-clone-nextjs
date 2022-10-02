import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface TitleProps {
    title: string;
}

export const Title = ({ title }: TitleProps) => {
    return (
        <AlertDialog.Title id="alertDialog-title" className="text-xl text-light-200 font-semibold tracking-wide">
            {title}
        </AlertDialog.Title>
    );
};
