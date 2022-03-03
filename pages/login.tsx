import * as React from 'react';

import { GuestLayout } from '@components/layouts/GuestLayout';
import { Informations } from '@components/auth/Informations';
import { Auth } from '@components/auth/Auth';

export default function Login() {
	return (
		<GuestLayout>
			<div className="flex flex-col md:flex-row justify-center gap-16">
				<Informations />
				<Auth />
			</div>
		</GuestLayout>
	);
}
