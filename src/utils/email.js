const nodemailer = require("nodemailer");
require('dotenv').config()

const sendMessage = (mail, text) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "sachinjangrapm@gmail.com",
            pass: process.env.MAIL_PASS,
        },
    });

    async function main(mail, text) {

        const info = await transporter.sendMail({
            from: 'sachinjangrapm@gmail.com',
            to: mail,
            subject: "Shipment Status Update",
            text: text,

        });
        logger.info("Status update email sent successfully");
        console.log("Message sent: %s", info.messageId);

    }

    main(mail, text).catch(console.error);

}

module.exports = sendMessage
