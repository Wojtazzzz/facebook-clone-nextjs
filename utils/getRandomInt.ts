export const getRandomInt = (min: number, max: number) => {
	if (min >= max) throw new Error('Min number cannot be bigger than max');

	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
};
