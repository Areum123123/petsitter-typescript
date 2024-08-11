import { UserTable } from "../models/auth";

declare global {
  namespace Express {
    interface Request {
      user?: UserTable;
    }
  }
}

//refreshtoken에서 req.user = user  이부분의 오류.
//'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' 형식에 'user' 속성이 없습니다.
