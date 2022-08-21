export const url = process.env.NEXT_PUBLIC_VERVEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERVEL_URL}/api/trpc`
    : `http://localhost:3000/api/trpc`;