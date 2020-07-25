import { uuid } from "uuidv4";
import { User } from "../../types";

const getNewId = () => uuid();

const currUser: User = { // choose current user from existing users
    userId: '587fe755-20b2-47fe-b3e8-cd83557d38af',
    user: 'Random user',
    avatar: 'https://images.unsplash.com/photo-1461800919507-79b16743b257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
};

const getCurrentUser = () => ({
    userId: currUser.userId,
    avatar: currUser.avatar,
    user: currUser.user,
})

export default {
    getNewId,
    getCurrentUser
};