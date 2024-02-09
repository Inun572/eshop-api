export interface UserPublicData {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  role_id: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPublicData;
  }
}
