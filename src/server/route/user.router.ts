import {createRouter} from "../createRouter";
import {createUserOutputSchema, createUserSchema, requestOtpSchema} from "../../schema/user.schema";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import {sendLoginEmail} from "../../utils/mailer";
import {url} from '../../constants'

export const userRouter = createRouter()
    .mutation('register-user', {
        input: createUserSchema,
        async resolve({ctx, input}) {
            const {email, name} = input

            try {
                const user = await ctx.prisma.user.create({
                    data: {
                        email,
                        name,
                    }
                })
                return user
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists',
                        })
                    }
                }

                throw  new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong'
                })
            }
        },
    })
    .mutation('request-otp', {
        input: requestOtpSchema,
        async resolve({input, ctx}) {
            const {email, redirect} = input;

            const user = await ctx.prisma.user.findUnique({
                where: {
                    email,
                }
            })

            if (!user) {
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not fount'
                })
            }

            const token = await ctx.prisma.loginToken.create({
                data: {
                    redirect,
                    user: {
                        connect: {
                            id: user.id,
                        }
                    }
                }
            })

            await sendLoginEmail({
                token: '',
                url: url,
                email: user.email
            })

            // send email to user
            return true
        }
    })