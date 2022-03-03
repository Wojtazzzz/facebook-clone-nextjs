import * as React from 'react';
import { memo } from 'react';

interface RequestErrorsProps {
	errors: never[];
}

export const RequestErrors = memo<RequestErrorsProps>(({ errors }) => {
	const ErrorsComponents = errors.map(error => <li key={error}>{error}</li>);

	return (
		<div className="text-red-400">
			<div className="font-medium">Whoops! Something went wrong.</div>

			<ul className="text-sm list-disc list-inside mt-1">{ErrorsComponents}</ul>
		</div>
	);
});

RequestErrors.displayName = 'RequestErrors';