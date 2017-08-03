import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../../config';

// smtp configuration
const mailTransport = nodemailer.createTransport(smtpTransport(config.smtpSettings));

// export send email
const sendEmail = (toEmail, mailSubject, mailBody) => {
  const mailOptions = {
    from: config.errorFromEmail,
    to: toEmail,
    subject: mailSubject,
    text: mailBody,
  };

  mailTransport.sendMail(mailOptions, (error, response) => { // eslint-disable-line
    mailTransport.close();
  });
};

export default {
  sendEmail,
};
