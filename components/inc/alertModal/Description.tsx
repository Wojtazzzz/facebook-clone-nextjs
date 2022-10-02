import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface DescriptionProps {
    description: string | undefined;
}

export const Description = ({ description }: DescriptionProps) => {
    return (
        <AlertDialog.Description id="alertDialog-description" className="text-light-100 mt-2">
            {description}
        </AlertDialog.Description>
    );
};
