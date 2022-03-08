import { PokeInfoType } from './PokeInfoType';

export type UserType = {
	id: number;
	first_name: string;
	last_name: string;
	profile_image: string;
	background_image: string;
	poke_info: Partial<PokeInfoType>;
};
