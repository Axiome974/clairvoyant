import dotenv from 'dotenv';

dotenv.config();


export const PORT:number = parseInt(process.env.PORT) || 3000;
export const SECRET_KEY:string = process.env.SECRET_KEY;
export const REFRESH_TOKEN_SECRET:string = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_EXPIRES_IN:number = parseInt(process.env.REFRESH_EXPIRES_IN) || 604800; // 1 week
export const JWT_EXPIRES_IN:number = parseInt(process.env.JWT_EXPIRES_IN) || 60*60; // 1 hour
export const DATABASE_URL:string = process.env.DATABASE_URL || null;
