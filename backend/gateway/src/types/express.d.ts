import type { MyJwtPayload } from "@backend/shared";

declare global{
    namespace Express{
        interface Request{
            user:MyJwtPayload
        }
    }
}

export {};