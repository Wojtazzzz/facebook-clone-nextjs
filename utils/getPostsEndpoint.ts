type IGetPostsEndpointArgs =
    | {
          type: 'all' | 'hidden' | 'saved';
      }
    | {
          type: 'own';
          userId: number;
      };

export const getPostsEndpoint = (args: IGetPostsEndpointArgs) => {
    switch (args.type) {
        case 'hidden':
            return '/api/hidden';

        case 'saved':
            return '/api/saved';

        case 'own':
            return `/api/users/${args.userId}/posts`;

        default:
        case 'all':
            return '/api/posts';
    }
};
