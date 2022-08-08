import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {withTRPC} from "@trpc/next";
import {loggerLink} from "@trpc/client/src/links/loggerLink";
import {httpBatchLink} from '@trpc/client/links/httpBatchLink';
import superjson from 'superjson';
import {AppRouter} from "../server/route/app.router";

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
    config({ctx}) {
        const url = process.env.NEXT_PUBLIC_VERVEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERVEL_URL}/api/trpc`
            : `http://localhost:3000/api/trpc`;

        // order matter
        const links = [
            loggerLink(),
            httpBatchLink({maxBatchSize: 10, url})
        ]

        return {
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        staleTime: 60
                    }
                }
            },
            headers() {
                if (ctx?.req) {
                    return {
                        ...ctx.req.headers,
                        'x-ssr': '1'
                    }
                }
                return {}
            }
            , links,
            transformer: superjson
        }
    },
    ssr: false
})(MyApp)
