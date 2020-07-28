import {AuthorizedUser} from "./containers/Routing/types";

export type MessageData = {
 id: string;
 userId: string;
 user: string;
 avatar: string;
 text: string;
 createdAt: string;
 editedAt: string;
 likeCount: number
}

export type AddMessageData = {
 userId: string;
 text: string;
 createdAt: string;
}

export type UpdateMessageData = {
 id: string;
 text: string;
 editedAt: string;
}

export type User = {
 id: string;
 username: string;
 email: string;
 avatar: string;
}

export type UserProfileData = {
 username: string;
 email: string;
 password: string;
}

export type ChatState = {
 messages: MessageData[];
 isLoading: boolean;
}

export type LoginState = {
 isAuthorized: boolean;
 user: AuthorizedUser;
}
