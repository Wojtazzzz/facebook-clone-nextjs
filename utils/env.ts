import invariant from 'invariant';

invariant(process.env.NEXT_PUBLIC_APP_NAME, 'Missing APP_NAME environment variable');
invariant(process.env.NEXT_PUBLIC_APP_URL, 'Missing APP_URL environment variable');
invariant(process.env.NEXT_PUBLIC_BACKEND_URL, 'Missing BACKEND_URL environment variable');
invariant(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, 'Missing PUSHER_APP_KEY environment variable');
invariant(process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER, 'Missing PUSHER_APP_CLUSTER environment variable');

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
export const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
