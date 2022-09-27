type IGetPostsQKArgs =
    | {
          type: 'all' | 'saved' | 'hidden';
      }
    | {
          type: 'own';
          userId: number;
      };

export const getContactsQK = () => ['contacts'];
export const getMessengerQK = () => ['messenger'];
export const getNotificationsQK = () => ['notifications'];

export const getChatQK = (friendId: number) => ['chat', friendId];

export const getPostsQK = (args: IGetPostsQKArgs) => {
    if (args.type === 'own') return ['posts', 'own', args.userId];
    if (args.type === 'hidden') return ['posts', 'hidden'];
    if (args.type === 'saved') return ['posts', 'saved'];

    return ['posts', 'all'];
};
export const getPostCommentsQK = (postId: number) => ['post', postId, 'comments'];
export const getPostLikesQK = (postId: number) => ['post', postId, 'likes'];

export const getCommentLikesQK = (commentId: number) => ['comment', commentId, 'likes'];
