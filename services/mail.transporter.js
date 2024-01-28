import nodemailer from 'nodemailer';

var mailOptions = {
    to:"",
    from:"20bcs034@iiitdwd.ac.in",
    body:""
}

// mail transporter
const mailTransporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    secure: false, 
    auth: {
        user: '20bcs034@iiitdwd.ac.in',
        pass: 'clza uuzx pjyh qwaw',
    },
    tls:{
        rejectUnauthorized: false
    }
})

export {mailTransporter, mailOptions};