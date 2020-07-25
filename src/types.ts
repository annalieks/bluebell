export type MessageData = {
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

export type AddMessageData = {
 text: string;
 createdAt: string;
}

export type UpdateMessageData = {
 id: string;
 text: string;
 editedAt: string;
}

export type User = {
 userId: string;
 user: string;
 avatar: string;
}

export type ChatState = {
 messages: MessageData[];
 editingMessage: MessageData | undefined;
}
