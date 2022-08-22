import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../utils/prisma";
import {verifyJwt} from "../utils/jwt";

interface CtxUser {
    id: string,
    email: string,
    name: string,
    iat: string,
    exp: number,
}

function getUserFromRequest(req: NextApiRequest) {
    const token = req.cookies.token

    if (token) {
        try {
            const verified = verifyJwt<CtxUser>(token)
            return verified
        } catch (e) {
            return null
        }
    }

    return null;
}

interface Obj {
    req: NextApiRequest,
    res: NextApiResponse,
}

export function createContext({req, res}: Obj) {
    const user = getUserFromRequest(req)
    return {req, res, prisma, user}
}

export type Context = ReturnType<typeof createContext>