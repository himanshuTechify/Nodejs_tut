const nodemailer = require('nodemailer');

const transporter =  nodemailer.createTransport({
    secure : true,
    host : 'smtp.gmail.com',
    port : 465,
    auth : {
        user : 'mandaviyahimanshu@gmail.com',
        pass : 'yckr vfxp vbsd wtga'
    }
})

function sendMail(to,sub,msg){
    transporter.sendMail({
        to : to,
        subject : sub,
        html : msg
    })
}

sendMail("himanshu.techify@gmail.com","Just Practise", "you get mail from nodemailer");