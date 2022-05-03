import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';

type success = 200 | 201 | 202 | 204;
type userError = 400 | 401 | 403 | 404 | 405 | 408 | 413 | 422;
type serverError = 500 | 501 | 502 | 503 | 504;
type status = success | userError | serverError;
type methods = 'GET' | 'POST' | 'DELETE';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export const mock = (path: string, status: status = 200, data?: {}, method: methods = 'GET') => {
    nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options(path).reply(200);

    if (method === 'GET') {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get(path).reply(status, data);
    } else if (method === 'POST') {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post(path).reply(status, data);
    } else if (method === 'DELETE') {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).delete(path).reply(status, data);
    }
};
