export interface IMessageData {
	id: string;
	userId: string;
	avatar: string;
	user: string;
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