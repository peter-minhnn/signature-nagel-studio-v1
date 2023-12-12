import axios, { AxiosResponse } from "axios";

interface IErrorResponse {
    code: number;
    message: string;
}

class CustomError extends Error {
    response: IErrorResponse;
    constructor(message: string, response: IErrorResponse) {
        super(message);
        this.response = response;
    }
}

const globalAxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL_BASE}/api`
});

globalAxiosInstance.interceptors.response.use(function (response: AxiosResponse) {
    if (typeof response.data == 'string' &&
        response.data.includes(
            'The request / response that are contrary to the Web firewall security policies have been blocked',
        )
    ) {
        const customError = new CustomError('firewallError', {
            code: 400,
            message: 'firewallError'
        });
        return Promise.reject(customError);
    }
    return response;
});

export default globalAxiosInstance;