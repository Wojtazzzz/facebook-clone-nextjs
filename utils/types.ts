import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type IUser = {
    id: number;
    name: string;
    first_name: string;
    profile_image: string;
    background_image: string;
};
export type IUserProfile = {
    id: number;
    name: string;
    first_name: string;
    profile_image: string;
    background_image: string;
    created_at: string;
    born_at: string;
    works_at?: string;
    went_to?: string;
    lives_in?: string;
    from?: string;
    marital_status?: string;
};

export type IFriend = {
    id: number;
    name: string;
    profile_image: string;
};

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

export type ICommentPayload = { content: string };

export type ILoginPayload = {
    email: string;
    password: string;
};

export type IPostCreatePayload = { content: string; images: File[] };
export type IPostUpdatePayload = { content: string; images: File[]; imagesToDelete: string[] };

export type IComment = {
    id: number;
    content: string;
    author: IUser;
    commentable_id: number;
    is_edited: boolean;
    is_liked: boolean;
    likes_count: number;
    created_at: string;
};

export type IChatMessageStatus = 'SENDING' | 'DELIVERED' | 'READ';

export type IChatMessage = {
    id: number | string;
    content?: string;
    images: string[];
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
    images: string[];
    author: IUser;
    likes_count: number;
    comments_count: number;
    is_liked: boolean;
    is_edited: boolean;
    type: IPostType;
    commenting: boolean;
    created_at: string;
};

export type IPostType = {
    is_own: boolean;
    is_saved: boolean;
    is_hidden: boolean;
};

export type IBirthday = {
    id: number;
    name: string;
};

export type ILike = {
    id: number;
    author: {
        id: number;
        name: string;
    };
};

export type IChatMessagePayload = {
    content: string;
    images: File[];
};

export type IPaginatedResponse<T> = {
    data: T[];
    current_page: number;
    next_page: number | undefined;
    prev_page: number | undefined;
};

export type IUpdateInvite = {
    friendId: number;
    status: 'CONFIRMED' | 'BLOCKED';
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

export type IChatFriend = IUser | IFriend;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};
