import React, {createContext, useContext} from "react";
import {AppRouter} from "../server/route/app.router";
import {inferProcedureOutput} from "@trpc/server";

type TQuery = keyof AppRouter['_def']['queries']

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>
const UserContext = createContext<InferQueryOutput<'users.me'>>(null);

interface Obj {
    children: React.ReactNode,
    value: InferQueryOutput<'users.me'> | undefined
}

function UserContextProvider({children, value}: Obj) {
    return <UserContext.Provider value={value || null}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext)

export {useUserContext, UserContextProvider}