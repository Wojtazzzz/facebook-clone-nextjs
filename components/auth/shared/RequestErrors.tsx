import * as React from 'react';

interface RequestErrorsProps {
	errors?: never[];
}

export const RequestErrors: React.FC<RequestErrorsProps> = ({ errors = [] }) => {
	const ErrorsComponents = errors.map(error => <li key={error}>{error}</li>);

	return (
		<>
			{errors.length > 0 && (
				<div className="text-red-400">
					<div className="font-medium">Whoops! Something went wrong.</div>

					<ul className="mt-1 list-disc list-inside text-sm">{ErrorsComponents}</ul>
				</div>
			)}
		</>
	);
};
