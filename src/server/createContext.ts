import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../utils/prisma";

interface Obj {
    req: NextApiRequest,
    res: NextApiResponse,
}

export function createContext({req, res}: Obj) {
    return {req, res, prisma}
}

export type Context = ReturnType<typeof createContext>