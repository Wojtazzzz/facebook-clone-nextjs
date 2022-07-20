export type IUser = {
    id: number;
    name: string;
    first_name: string;
    profile_image: string;
    background_image: string;
};

export type IMaritalStatus =
    | 'Single'
    | 'In a relationship'
    | 'Engaged'
    | 'Married'
    | 'In a civil partnership'
    | 'In a domestic partnership'
    | 'In an open relationship'
    | 'Its complicated'
    | 'Separated'
    | 'Widowed';

export type IUserProfile = {
    id: number;
    name: string;
    first_name: string;
    profile_image: string;
    background_image: string;
    created_at: string;
    works_at: string;
    went_to: string;
    lives_in: string;
    from: string;
    marital_status: IMaritalStatus;
};

export type IUserHit = {
    id: number;
    first_name: string;
    last_name: string;
    profile_image: string;
};

export type IUsePaginatedDataState = 'LOADING' | 'FETCHING' | 'ERROR' | 'SUCCESS';

type IUseAxiosData<T> = {
    data: T;
    message: string;
};

export type IUseAxiosState<T> =
    | { status: 'EMPTY' }
    | { status: 'LOADING' }
    | { status: 'ERROR'; error: unknown }
    | { status: 'SUCCESS'; data: IUseAxiosData<T> };

export type IFriendsList = 'Friends' | 'Invites' | 'Suggests' | 'Pokes';

export type IFriendsListItem = {
    friend: IUser;
    data?: IPoke;
};

export type IPoke = {
    id: number;
    count: number;
    updated_at: string;
};

export type IAuthMiddleware = 'GUEST' | 'AUTH';

export type ICreatePostResponse = {
    data: IPost;
    message: string;
};

export type ILikeResponse = {
    likesCount: number;
};

export type ICommentPayload = { content: string; resource_id: number };

export type ILoginPayload = {
    email: string;
    password: string;
};

export type IPostPayload = { content: string; images: File[] };

export type IComment = {
    id: number;
    content: string;
    author: IUser;
    resource_id: number;
    resource: 'POST' | 'COMMENT' | 'SALE';
    created_at: string;
    updated_at: string;
};

export type IChatMessage = {
    id: number;
    text: string;
    isReceived: boolean;
    created_at: string;
};

export type INotification = {
    id: string;
    message: string;
    friend: IUser;
    link: string;
    read_at: string | null;
    created_at: string;
};

export type IPost = {
    id: number;
    content: string;
    images?: string[];
    author: IUser;
    likes_count: number;
    comments_count: number;
    isLiked: boolean;
    created_at: string;
    updated_at: string;
};

export type IContact = {
    id: number;
    name: string;
    profile_image: string;
};

export type IChatFriend = {
    id: number;
    name: string;
    profile_image: string;
};

export type IProfileFriendsData = {
    amount: number;
    list: IUser[];
};

export type IPostsEndpoints = '/api/posts/self' | '/api/hidden/posts' | '/api/saved/posts';
