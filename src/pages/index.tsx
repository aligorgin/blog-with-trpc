import type {NextPage} from 'next'
import {trpc} from "../utils/trpc";
import {useUserContext} from "../context/user.context";
import LoginForm from "../component/LoginForm";
import Link from 'next/link';

const Home: NextPage = () => {
    const user = useUserContext()
    if (!user) {
        return <LoginForm/>
    }

    return <div>
        <Link href='/posts/new'>
            Create post
        </Link>
    </div>
}

export default Home
