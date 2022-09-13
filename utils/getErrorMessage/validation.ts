import { object, string, number, InferType } from 'yup';
import type { ObjectSchema } from 'yup';

type IError = {
    response: {
        status: number;
        data: {};
    };
};

type IDataWithMessage = {
    message: string;
};

const errorSchema: ObjectSchema<IError> = object({
    response: object({
        status: number().required(),
        data: object(),
    }),
});

const dataSchema: ObjectSchema<IDataWithMessage> = object({
    message: string().required(),
});

export const checkErrorHasStatus = (error: unknown): error is InferType<typeof errorSchema> => {
    if (!error || typeof error !== 'object') return false;

    return errorSchema.isValidSync({ ...error });
};

export const checkDataHasMessage = (data: {}): data is InferType<typeof dataSchema> => {
    return dataSchema.isValidSync(data);
};
