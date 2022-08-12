import Link from 'next/link'
import {useForm} from "react-hook-form";
import {trpc} from "../utils/trpc";
import {CreateUserInput} from "../schema/user.schema";
import {userRouter} from "../server/route/user.router";

export default function Register() {
    const {handleSubmit, register} = useForm<CreateUserInput>();
    const router = userRouter

    const {mutate, error} = trpc.useMutation(['users.register-user'], {
        onError: (error) => {

        },
        onSuccess: () => {

        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate(values)
    }

    return (
        <>
            <form className='h-screen w-full grid justify-items-center border-2 border-y-zinc-500'
                  onSubmit={handleSubmit(onSubmit)} action="">
                {error && error.message}
                <div className='p-4 text-lg'>Register</div>
                <input type="email" placeholder='mark.zackerberg@facebook.com' {...register('email')}/>
                <br/>
                <input type="text" placeholder='mark' {...register('name')}/>
                <button type={'submit'}>Register</button>
            </form>

            <Link href='/login'>
                Login
            </Link>
        </>
    )
}