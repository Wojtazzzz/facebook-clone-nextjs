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
    name: string;
    profile_image: string;
};

export type IUsePaginatedDataState = 'LOADING' | 'FETCHING' | 'ERROR' | 'SUCCESS';

export type IFriendsList = 'Friends' | 'Invites' | 'Suggests' | 'Pokes';

export type IFriendsListItem =
    | {
          friend: IUser;
      }
    | IPoke;

export type IPoke = {
    friend: IUser;
    data: {
        id: number;
        count: number;
        updated_at: string;
    };
};

export type IAuthMiddleware = 'GUEST' | 'AUTH';

export type ICreatePostResponse = {
    data: IPost;
    message: string;
};

export type ILikeResponse = {
    likesCount: number;
};

export type ICommentPayload = { content: string };

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
    is_edited: boolean;
    created_at: string;
};

export type IChatMessageStatus = 'SENDING' | 'DELIVERED' | 'READ';

export type IChatMessage = {
    id: number | string;
    text: string;
    is_received: boolean;
    status: IChatMessageStatus;
    read_at: string | undefined;
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
    is_liked: boolean;
    is_edited: boolean;
    created_at: string;
    type: IPostType;
};

export type IContact = {
    id: number;
    name: string;
    profile_image: string;
};

export type IProfileFriendsData = {
    amount: number;
    list: IUser[];
};

export type IPostType = 'OWN' | 'FRIEND' | 'HIDDEN' | 'SAVED';

export type ILike = {
    id: number;
    author: {
        id: number;
        name: string;
    };
};

export type IChatMessagePayload = {
    text: string;
};

export type IPaginatedResponse<T> = {
    data: T[];
    current_page: number;
    next_page: number | undefined;
    prev_page: number | undefined;
};

export type IUpdateInviteStatus = 'CONFIRMED' | 'BLOCKED';

export type IUpdateInvite = {
    friendId: number;
    status: IUpdateInviteStatus;
};

export type IValidationError = {
    response: {
        data: {
            message: string;
            errors: {
                [key: string]: [messages: string[]];
            };
        };
        status: number;
        statusText: string;
    };
};

export type IMessageIconType = 'AVATAR' | 'SENDING' | 'DELIVERED' | undefined;
export type IChatFriend = IUser | IContact;
