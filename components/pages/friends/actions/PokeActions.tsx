import { usePokes } from '@hooks/usePokes';

import { Failure } from '@components/pages/friends/actions/responses/Failure';
import { Success } from '@components/pages/friends/actions/responses/Success';
import { Button } from '@components/inc/Button';

import type { MouseEvent } from 'react';
import type { PokingUserType } from '@ctypes/features/PokingUserType';

interface PokeActionsProps {
    friend: PokingUserType;
}

export const PokeActions = ({ friend }: PokeActionsProps) => {
    const { state, poke } = usePokes();

    const handlePoke = (event: MouseEvent) => {
        event.preventDefault();

        poke(friend.id);
    };

    if (state.status === 'SUCCESS') return <Success message="Friend poked back" />;
    if (state.status === 'ERROR') return <Failure message="Something went wrong" />;

    return (
        <div className="w-[220px] flex flex-col items-center gap-1">
            <Button
                title="Poke back"
                isDisabled={state.status === 'LOADING'}
                styles="w-[150px]"
                callback={handlePoke}
            />

            <div className="flex flex-col items-center text-light-100">
                <small>
                    {friend.first_name} poked you {friend.poke_info?.count} times in a row
                </small>

                <small>{friend.poke_info?.updated_at}</small>
            </div>
        </div>
    );
};
