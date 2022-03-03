import * as React from 'react';

interface SuccessProps {
	message: string;
}

export const Success = ({ message }: SuccessProps) => {
	return <span className="text-sm text-green-600 font-medium">{message}</span>;
};
