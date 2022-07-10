export type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email_verified_at: string;
    profile_image: string;
    background_image: string;
    updated_at: string;
};

export type PostType = {
    id: number;
    content: string;
    images?: string[];
    author_id: number;
    created_at: string;
    updated_at: string;
};
