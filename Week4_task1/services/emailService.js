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

const sendEmailWithAttachment = async (
  to,
  subject,
  text,
  filename
) => {
  const mailOptions = {
    from: "mandaviyahimanshu@gmail.com",
    to: to,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: filename
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailWithAttachment;
