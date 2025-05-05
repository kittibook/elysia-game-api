import { JWTPayloadSpec } from "@elysiajs/jwt";


export interface modelLogin {
    username : string,
    password : string
}

interface sign {
    id: number;
    username: string;
    email: string;
    roleId: number;
    createdAt: Date;
}

export interface modelJWT {
    sign: (payload: sign) => Promise<string>;
    verify: (token: string) => Promise<object | false>;
}