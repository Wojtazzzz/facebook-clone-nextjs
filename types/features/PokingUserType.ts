import type { UserType } from '@ctypes/features/UserType';

type PokeType = {
	poke_info: {
		id: number;
		count: number;
		updated_at: string;
	};
};

export interface PokingUserType extends UserType, PokeType {}
