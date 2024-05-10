import ApiException from "./ApiException";


export const userNotFound:ApiException = new ApiException(404, 'User not found');
export const userAlreadyExist:ApiException = new ApiException(409, 'User already exist');