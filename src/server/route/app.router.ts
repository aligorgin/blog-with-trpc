import {createRouter} from "../createRouter";
import {userRouter} from "./user.router";
import {postRouter} from "./post.router";

export const appRouter = createRouter().merge('users.',userRouter).merge('posts.',postRouter);

export type AppRouter = typeof appRouter;