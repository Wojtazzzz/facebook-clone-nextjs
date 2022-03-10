import type { UserType } from '@ctypes/features/UserType';
import type { NotificationType as NotificationTypeEnum } from '@enums/NotificationType';

export type NotificationType = {
	id: string;
	type: string;
	notifiable_type: string;
	notifiable_id: number;
	data: {
		type: NotificationTypeEnum;
		initiator: UserType;
	};
	read_at?: string;
	created_at: string;
	updated_at: string;
};
