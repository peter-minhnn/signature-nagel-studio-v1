import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { DeleteUser, CreateUser, UpdateUser } from "@/types/user-type";

export const getUser = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/user', params));
export const getAllUser = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/user/all', params, true));
export const createUser = requestHandler<CreateUser, any>((params?: any) => axiosWrapper.post('/user/create', params, false, true));
export const deleteUser = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/user/delete', params, false, true));
export const updateUser = requestHandler<UpdateUser, any>((params?: any) => axiosWrapper.post('/user/update', params));
export const changePasswordUser = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/user/change-password', params));