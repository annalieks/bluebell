import { User } from '../../types';

export type UserLoginData = {
    username: string;
    password: string;
}

export type AuthorizedUser = {
    user: User;
    role: string;
}
