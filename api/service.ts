import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";

export const getService = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/service', params));