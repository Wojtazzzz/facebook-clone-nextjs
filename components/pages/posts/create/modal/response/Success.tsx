import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const Success = () => {
	return (
		<div className="w-full flex flex-col items-center gap-6 py-16">
			<span className="text-2xl font-medium text-light-100">Post created successfully</span>

			<FontAwesomeIcon icon={faCheck} className="text-5xl text-green-400" />
		</div>
	);
};
