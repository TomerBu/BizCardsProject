// User type for login:
export type RequestUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};

//ammend express - add RequestUser to Request
declare global {
  namespace Express {
    interface Request {
        user? : RequestUser
    }
  }
}
