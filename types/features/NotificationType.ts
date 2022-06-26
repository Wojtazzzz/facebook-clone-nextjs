import type { UserType } from '@ctypes/features/UserType';

export type NotificationType = {
    id: string;
    message: string;
    friend: UserType;
    link: string;
    read_at: string | null;
    created_at: string;
};
