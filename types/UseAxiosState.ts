import { StateStatus } from '@enums/StateStatus';type data = {
	data: [];
	message: string;
};

export type UseAxiosState =
	| { status: StateStatus.EMPTY }
	| { status: StateStatus.LOADING }
	| { status: StateStatus.ERROR; error: Error }
	| { status: StateStatus.SUCCESS; data: data };
