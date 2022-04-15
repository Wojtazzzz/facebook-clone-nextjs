import type { ReplyHeaders } from 'nock';

const allowedHeaders = ['ClientName', 'ClientVersion', 'Content-Type', 'Authorization', 'X-Requested-With'];

export const nockReplyHeaders: ReplyHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-headers': allowedHeaders.join(','),
};
