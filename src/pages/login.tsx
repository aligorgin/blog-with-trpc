import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('../component/LoginForm'), {
    ssr: false
})

export default function LoginPage() {
    return (
        <div>
            <LoginForm/>
        </div>
    )
}