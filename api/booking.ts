import { axiosWrapper } from "@/api/axios-wrapper";
import { requestHandler } from "@/api/request-handler";
import { DeleteUser, CreateUser, UpdateUser } from "@/types/user-type";

export const getBooking = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/booking/getBookingByEmail', params));
export const getAllBooking = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/booking/getBooking', params, true));
export const getBookingDetails = requestHandler<{}, any>((params?: any) => axiosWrapper.get('/booking/details', params));
export const createBooking = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/booking/create', params));
export const updateBooking = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/booking/update', params));
export const updateBookingStatus = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/booking/update-status', params, false, true));
export const deleteBooking = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/booking/delete', params));
export const deleteBookingAdmin = requestHandler<{}, any>((params?: any) => axiosWrapper.post('/booking/delete', params, false, true));