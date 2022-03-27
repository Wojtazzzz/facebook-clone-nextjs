import type { UserType } from '@ctypes/features/UserType';

export type PostType = {
	id: number;
	content: string;
	images?: string[];
	author: UserType;
	likes_count: number;
	comments_count: number;
	isLiked: boolean;
	created_at: string;
	updated_at: string;
};
