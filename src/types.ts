export interface IMessageData {
 id: string;
 userId: string;
 user: string;
 avatar: string;
 text: string;
 createdAt: string;
 editedAt: string;
 likeCount: number;
 isLike?: boolean;
}

export interface IAddMessage {
 text: string;
 createdAt: string;
}

export interface IUpdateMessage {
 id: string;
 text: string;
 editedAt: string;
}

export interface IUser {
 userId: string;
 user: string;
 avatar: string;
}

export interface ChatState {
 messages: IMessageData[];
}

export interface EditModalState {
 id: string;
 text: string;
}