export interface IApiException {
    status: number;
    message: string;
}

export default class ApiException extends Error implements IApiException {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}