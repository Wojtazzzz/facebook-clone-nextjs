export type IUser = {
    id: number;
    first_name: string;
    last_name: string;
    email_verified_at: string;
    profile_image: string;
    background_image: string;
    updated_at: string;
};

export type IPost = {
    id: number;
    content: string;
    images: string[];
    author_id: number;
    created_at: string;
    updated_at: string;
    commenting: boolean;
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

export type IUserExtended = {
    works_at: string;
    went_to: string;
    lives_in: string;
    from: string;
    marital_status: IMaritalStatus;
    created_at: string;
    born_at: string;
} & IUser;
