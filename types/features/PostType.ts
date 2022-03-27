import type { UserType } from '@ctypes/features/UserType';

export type PostType = {
	id: number;
	content: string;
	author: UserType;
	created_at: string;
	updated_at: string;
};
