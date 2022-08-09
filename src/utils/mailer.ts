import nodemailer from 'nodemailer';

interface Obj {
    email: string,
    url: string,
    token: string
}

export async function sendLoginEmail({email, url, token}: Obj) {

    const testAccount = await nodemailer.createTestAccount();

    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })

    const info = await transporter.sendMail({
        from: '"nick logan" <ni.cklogan@example.com>',
        to: email,
        subject: 'Login to your account',
        html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`
    })

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}