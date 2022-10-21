type IGetPostsQKArgs =
    | {
          type: 'all' | 'saved' | 'hidden';
      }
    | {
          type: 'own';
          userId: number;
      };

export const getContactsQK = () => ['contacts'];
export const getChatQK = (friendId: number) => ['chat', friendId];
export const getBirthdaysQK = () => ['birthdays'];
export const getUserQK = () => ['user'];
export const getUserEmailQK = () => ['userEmail'];

export const getMessengerQK = () => ['messenger'];
export const getCheckUnreadMessengerQK = () => ['messenger', 'checkUnread'];
export const getNotificationsQK = () => ['notifications'];
export const getCheckUnreadNotificationsQK = () => ['notifications', 'checkUnread'];

export const getPostsQK = (args: IGetPostsQKArgs) => {
    if (args.type === 'own') return ['posts', 'own', args.userId];
    if (args.type === 'hidden') return ['posts', 'hidden'];
    if (args.type === 'saved') return ['posts', 'saved'];

    return ['posts', 'all'];
};
export const getPostCommentsQK = (postId: number) => ['post', postId, 'comments'];
export const getPostLikesQK = (postId: number) => ['post', postId, 'likes'];

export const getCommentLikesQK = (commentId: number) => ['comment', commentId, 'likes'];

export const getSearchUsersQK = (query: string) => ['search', 'users', query];
export const getSearchFriendsQK = (userId: number, query: string) => ['search', 'friends', userId, query];

export const getInvitesListQK = () => ['Invites'];
export const getSuggestsListQK = () => ['Suggests'];
export const getPokesListQK = () => ['Pokes'];
export const getFriendsListQK = () => ['Friends'];
export const getFriendsByCountQK = (userId: number, count: number) => ['friends', { userId, count }];
