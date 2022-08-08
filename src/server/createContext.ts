import {NextApiRequest, NextApiResponse} from "next";
import {create} from "domain";

interface Obj {
    req: NextApiRequest,
    res: NextApiResponse,
}

export function createContext({req, res}: Obj) {
    return {req, res}
}

export type Context = ReturnType<typeof createContext>