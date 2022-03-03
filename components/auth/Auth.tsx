import * as React from 'react';

import { Informations } from '@components/auth/Informations';
import { Form } from '@components/auth/Form';

export const Auth = () => {
	return (
		<div className="flex flex-col md:flex-row justify-center gap-16">
			<Informations />
			<Form />
		</div>
	);
};
