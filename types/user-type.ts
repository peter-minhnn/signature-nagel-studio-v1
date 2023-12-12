export type LoginRequest = {
    username: string,
    password: string
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
}

export interface CreateUser {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthday: string;
}

export interface UpdateUser {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
}

export interface DeleteUser {
    id: number;
    email: string;
}