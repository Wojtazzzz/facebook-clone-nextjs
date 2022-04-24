import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';

type success = 200 | 201 | 202 | 204;
type userError = 400 | 401 | 403 | 404 | 405 | 408 | 422;
type serverError = 500 | 501 | 502 | 503 | 504;
type status = success | userError | serverError;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export const mock = (url: string, status: status = 200, data?: {}, method: 'GET' | 'POST' = 'GET') => {
    nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options(url).reply(200);

    method === 'GET'
        ? nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get(url).reply(status, data)
        : nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post(url).reply(status, data);
};
