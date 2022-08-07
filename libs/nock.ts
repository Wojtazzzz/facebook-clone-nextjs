import nock from 'nock';
import type { ReplyHeaders } from 'nock';

const allowedHeaders = ['ClientName', 'ClientVersion', 'Content-Type', 'Authorization', 'X-Requested-With'];

const nockReplyHeaders: ReplyHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers': allowedHeaders.join(','),
};

type ISuccess = 200 | 201 | 202 | 204;
type IUserError = 400 | 401 | 403 | 404 | 405 | 408 | 413 | 422;
type IServerError = 500 | 501 | 502 | 503 | 504;
type IStatus = ISuccess | IUserError | IServerError;
type IMethod = 'get' | 'post' | 'delete' | 'put';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export const mock = (path: string, status: IStatus = 200, data?: {}, method: IMethod = 'get') => {
    nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options(path).reply(200);
    nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders)[method](path).reply(status, data);
};
