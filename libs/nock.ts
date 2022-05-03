import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';

type success = 200 | 201 | 202 | 204;
type userError = 400 | 401 | 403 | 404 | 405 | 408 | 413 | 422;
type serverError = 500 | 501 | 502 | 503 | 504;
type status = success | userError | serverError;
type methods = 'get' | 'post' | 'delete';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export const mock = (path: string, status: status = 200, data?: {}, method: methods = 'get') => {
    nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options(path).reply(200);
    nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders)[method](path).reply(status, data);
};
