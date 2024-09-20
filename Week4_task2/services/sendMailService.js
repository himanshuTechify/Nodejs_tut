const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "mandaviyahimanshu@gmail.com",
    pass: "yckr vfxp vbsd wtga",
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "mandaviyahimanshu@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};



module.exports = { sendEmail };
