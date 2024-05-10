import ApiException from "./ApiException";

export const badRefreshToken = new ApiException(401, 'Bad token');
export const tokenNotFound = new ApiException(404, 'Token not found');