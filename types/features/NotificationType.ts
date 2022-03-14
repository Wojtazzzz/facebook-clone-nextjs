import type { UserType } from '@ctypes/features/UserType';
import type { NotificationType as NotificationTypeEnum } from '@enums/NotificationType';

export type NotificationType = {
	id: string;
	data: {
		type: NotificationTypeEnum;
		initiator: UserType;
	};
	read_at?: string;
	created_at: string;
};
