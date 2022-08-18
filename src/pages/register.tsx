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
            <form className='grid justify-items-center '
                  onSubmit={handleSubmit(onSubmit)}>
                {error && error.message}
                <div className='p-4 text-lg'>Register</div>
                <input
                    type="email"
                    placeholder='mark.zackerberg@facebook.com'
                    {...register('email')}
                />
                <br/>
                <input
                    type="text"
                    placeholder='mark'
                    {...register('name')}
                />
                <button className='bg-blue-50 px-4 py-2 rounded-md hover:bg-blue-100' type={'submit'}>Register</button>
            </form>

            <Link href='/login'>
                <div className='grid justify-items-center text-blue-400 cursor-pointer'>Login</div>
            </Link>
        </>
    )
}