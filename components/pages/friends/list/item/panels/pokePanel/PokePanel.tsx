import { usePokes } from '@hooks/usePokes';
import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IPoke } from '@utils/types';
import { PanelButton } from '../PanelButton';
import { Info } from './Info';
import { SuccessMessage } from '../SuccessMessage';

interface PokePanelProps extends IPoke {}

export const PokePanel = ({ friend, data }: PokePanelProps) => {
    const { poke, isLoading, isSuccess, isError } = usePokes();

    const handlePoke = () => {
        poke(friend.id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;
    if (isSuccess) return <SuccessMessage message="User successfully poked" />;

    return (
        <div className="w-[220px] flex flex-col items-end gap-1">
            <PanelButton title="Poke back" isLoading={isLoading} callback={handlePoke} />

            <Info firstName={friend.first_name} count={data.count} updatedAt={data.updated_at} />
        </div>
    );
};
