import { FriendType } from "@ctypes/features/FriendType";

export type UserType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    profile_image: string,
    background_image: string,
    friends: FriendType[],
    friends_of_this_user: FriendType[],
    this_user_friend_of: FriendType[]
}