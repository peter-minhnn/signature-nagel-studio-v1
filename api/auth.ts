import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { LoginRequest } from "@/types/login-type";

export const authenticate = requestHandler<LoginRequest, any>((params?: any) => axiosWrapper.post('/user/staff', params));
export const authUser = requestHandler<LoginRequest, any>((params?: any) => axiosWrapper.post('/auth/auth-user', params));
export const authMember = requestHandler<LoginRequest, any>((params?: any) => axiosWrapper.post('/auth/auth-member', params));
export const checkAuth = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/auth/valid-token', params));