export type MessengerNotificationType = {
	id: number;
	text: string;
	friend: {
		id: number;
		name: string;
		profile_image: string;
	};
	created_at: string;
};
