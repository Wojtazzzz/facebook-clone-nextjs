import { FriendType } from "@ctypes/features/FriendType";

export type UserType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    image: string,
    friends: FriendType[]
}