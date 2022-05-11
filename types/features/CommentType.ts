import type { UserType } from '@ctypes/features/UserType';

export type CommentType = {
    id: number;
    content: string;
    author: UserType;
    resource_id: number;
    resource: 'POST' | 'COMMENT' | 'SALE';
    created_at: string;
    updated_at: string;
};
