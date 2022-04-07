import type { UserType } from '@ctypes/features/UserType';

export type NotificationType = {
    id: string;
    data: {
        type: 'FRIENDSHIP_INVITATION_SENDED' | 'FRIENDSHIP_INVITATION_ACCEPTED';
        initiator: UserType;
    };
    read_at?: string;
    created_at: string;
};
