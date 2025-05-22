import { JWTPayloadSpec } from "@elysiajs/jwt";


export interface modelLogin {
    username : string,
    password : string
}

interface sign {
    id: number;
    username: string;
    email: string;
    sessionId: string;
    createdAt: Date;
}

export interface modelJWT {
    sign: (payload: sign) => Promise<string>;
    verify: (token: string) => Promise<object | false>;
}