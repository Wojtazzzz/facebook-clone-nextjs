import * as React from 'react';

import { GuestLayout } from '@components/layouts/GuestLayout';
import { Auth } from '@components/auth/Auth';

export default function Login() {
	return (
		<GuestLayout>
			<Auth />
		</GuestLayout>
	);
}
