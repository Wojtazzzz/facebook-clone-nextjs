import { usePokes } from '@hooks/usePokes';

import { Failure } from '@components/pages/friends/item/actions/responses/Failure';
import { Success } from '@components/pages/friends/item/actions/responses/Success';
import { Button } from '@components/inc/Button';

import type { MouseEvent } from 'react';
import type { IPoke } from '@utils/types';

interface PokeActionsProps extends IPoke {}

export const PokeActions = ({ friend, data }: PokeActionsProps) => {
    const { poke, isLoading, isSuccess, isError } = usePokes();

    const handlePoke = (event: MouseEvent) => {
        event.preventDefault();
        poke(friend.id);
    };

    if (isSuccess) return <Success message="Friend poked back" />;
    if (isError) return <Failure message="Something went wrong" />;

    return (
        <div className="w-[220px] flex flex-col items-center gap-1">
            <Button title="Poke back" isDisabled={isLoading} styles="w-[150px]" callback={handlePoke} />

            <div className="flex flex-col items-center text-light-100">
                <small>
                    {friend.first_name} poked you {data.count} times in a row
                </small>

                <small>{data.updated_at}</small>
            </div>
        </div>
    );
};
