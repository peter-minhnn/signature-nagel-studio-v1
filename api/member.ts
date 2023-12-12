import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "./request-handler";

export const getMember = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/member', params, true));
// export const createUser = requestHandler<CreateUser, any>((params?: any) => axiosWrapper.post('/user/create', params));
export const updateMember = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/member/update', params, false, true));
export const changePasswordMember = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/member/change-password', params, false, true));