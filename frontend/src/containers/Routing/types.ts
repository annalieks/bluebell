import { User } from '../../types';

export type UserLoginData = {
    username: string;
    password: string;
}

export type AuthorizedUser = {
    isAuthorized: boolean;
    user: User;
    role: string;
}
