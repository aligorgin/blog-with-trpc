export const baseUrl = process.env.NEXT_PUBLIC_VERVEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERVEL_URL}`
    : `http://localhost:3000`;

export const url = `${baseUrl}/api/trpc`;