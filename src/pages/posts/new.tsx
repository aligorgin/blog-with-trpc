import {useForm} from "react-hook-form";
import {CreatePostInput} from "../../schema/post.schema";
import {trpc} from "../../utils/trpc";
import {useRouter} from "next/router";

export default function CreatePostPage() {
    const {handleSubmit, register} = useForm<CreatePostInput>();
    const router = useRouter()
    const {mutate, error} = trpc.useMutation(['posts.create-post'], {
        onSuccess({id}) {
            router.push(`/posts/${id}`)
        }
    });

    function onSubmit(values: CreatePostInput) {
        mutate(values)
    }

    return (
        <>
            <div className='w-full flex justify-start items-center flex-col mt-16'>
                <div className='w-1/2 border-2 dark:border-zinc-200 border-zinc-900 p-4 rounded-md'>
                    <form className='flex flex-col  items-start'
                          onSubmit={handleSubmit(onSubmit)}>
                        {error && error.message}
                        <div className='text-lg mb-4'>Create posts</div>
                        <input
                            className='dark:text-zinc-900 text-zinc-200'
                            type="text"
                            placeholder={'your post title'}
                            {...register('title')}
                        />
                        <textarea
                            className='dark:text-zinc-900 text-zinc-200'
                            placeholder={'your post title'}
                            {...register('body')}
                        />
                        <button
                            className='flex justify-center items-center w-full py-2 bg-green-400 dark:text-zinc-900 text-zinc-200 rounded-md mb-4 hover:bg-green-500 transition'
                            type={'submit'}>Create post
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}