export interface IMessageData {
 id: string;
 userId: string;
 user: string;
 avatar: string;
 text: string;
 createdAt: string;
 editedAt: string;
 likeCount: number;
}

export interface IDatedMessages {
 [index: string]: IMessageData[];
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

export interface IState {
 messages: IMessageData[];
 editedMessageId: string;
}

export interface IAction<T> {
 type: string,
 payload: T;
}

export interface IAddPayload {
 id: string;
 message: IAddMessage
}

export interface IUpdatePayload {
 message: IMessageData;
}

export interface IDeletePayload {
 id: string;
}

export interface ILikePayload {
 id: string;
 isLike: boolean;
}

export function isAddPayload(object: any): object is IAddPayload {
 return ('id' in object && 'text' in object && 'createdAt' in object);
}

export function isUpdatePayload(object: any): object is IUpdatePayload {
 return 'message' in object;
}

export function isDeletePayload(object: any): object is IDeletePayload {
 return 'id' in object;
}

export function isLikePayload(object: any): object is ILikePayload {
 return 'id' in object && 'isLike' in object;
}