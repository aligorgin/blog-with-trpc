import Link from 'next/link'
import {useForm} from "react-hook-form";
import {CreateUserInput} from "../schema/user.schema";
import {trpc} from "../utils/trpc";
import {useRouter} from "next/router";

export default function Register() {
    const {handleSubmit, register} = useForm<CreateUserInput>();
    const router = useRouter();

    const {mutate, error} = trpc.useMutation(['users.register-user'], {
        onSuccess: () => {
            router.push('/login')
        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate(values)
    }

    return (
        <>
            <div className='w-full flex justify-start items-center flex-col mt-16'>
                <div className='border-2 dark:border-zinc-200 border-zinc-900 p-4 rounded-md'>
                    <form className='flex flex-col  items-start'
                          onSubmit={handleSubmit(onSubmit)}>
                        {error && error.message}
                        <div className='text-lg mb-4'>Register</div>
                        <input
                            className='dark:text-zinc-900 text-zinc-200'
                            type="email"
                            placeholder='mark.zackerberg@facebook.com'
                            {...register('email')}
                        />
                        <br/>
                        <input
                            className='dark:text-zinc-900 text-zinc-200 mb-6'
                            type="text"
                            placeholder='mark'
                            {...register('name')}
                        />
                        <button className='flex justify-center items-center w-full py-2 bg-green-400 dark:text-zinc-900 text-zinc-200 rounded-md mb-4 hover:bg-green-500 transition' type={'submit'}>Register</button>
                    </form>

                    <Link href='/login'>
                        <div className='text-blue-400 cursor-pointer'>Login</div>
                    </Link>
                </div>
            </div>
        </>
    )
}