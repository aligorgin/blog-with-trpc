import Link from 'next/link'
import {useForm} from "react-hook-form";
import {CreateUserInput} from "../schema/user.schema";
import {trpc} from "../utils/trpc";
import {useRouter} from "next/router";
import {useState} from "react";

function VerifyToken({hash}: { hash: string }) {
    const router = useRouter()
    const {data, isLoading} = trpc.useQuery(['users.verify-otp', {
        hash
    }])
    if (isLoading) {
        return <p className='w-full flex items-center justify-center mt-16'>verifying...</p>
    }
    router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')
    return <p className='w-full flex items-center justify-center mt-16'>Redirecting...</p>

}

export default function LoginForm() {
    const {handleSubmit, register} = useForm<CreateUserInput>();
    const [success, setSuccess] = useState(false)
    const router = useRouter();

    const {mutate, error} = trpc.useMutation(['users.request-otp'], {
        onSuccess: () => {
            setSuccess(true)
        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate({...values,redirect:router.asPath})
    }

    const hash = router.asPath.split('#token=')[1];

    if (hash) {
        return <VerifyToken hash='hash'/>
    }

    return (
        <>
            <div className='w-full flex justify-start items-center flex-col mt-16'>
                <div className='border-2 dark:border-zinc-200 border-zinc-900 p-4 rounded-md'>
                    <form className='flex flex-col  items-start'
                          onSubmit={handleSubmit(onSubmit)}>
                        {error && error.message}
                        {success && <p>check your email</p>}
                        <div className='text-lg mb-4'>Login</div>
                        <input
                            className='dark:text-zinc-900 text-zinc-200'
                            type="email"
                            placeholder='mark.zackerberg@facebook.com'
                            {...register('email')}
                        />
                        <br/>
                        <button
                            className='flex justify-center items-center w-full py-2 bg-green-400 dark:text-zinc-900 text-zinc-200 rounded-md mb-4 hover:bg-green-500 transition'
                            type={'submit'}>Login
                        </button>
                    </form>

                    <Link href='/register'>
                        <div className='text-blue-400 cursor-pointer'>Register</div>
                    </Link>
                </div>
            </div>
        </>
    )
}