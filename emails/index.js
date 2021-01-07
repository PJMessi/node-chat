const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

class NodemailerHandlebarEmail {

    /**
     * NodemailerHandlebarEmail constructor.
     */
    constructor() {
        if (new.target === NodemailerHandlebarEmail) throw new TypeError("Cannot construct Abstract instances directly");

        // setting up email server credentials.
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
            },
        })

        // setting up transport to use express handlebars templates.
        this.transporter.use( 'compile', hbs({
            viewEngine: {
                partialsDir: 'views/email/layouts',
                defaultLayout: '',
            },
            viewPath: 'views/email',
            extName: '.handlebars'
        }));
    }
    

    /**
     * Returns the mail options.
     */
    setMailOptions = () => {
        return {
            from: "sender-email",
            to: "reveiver-email",
            subject: 'email-subject',
            template: 'template-file-name',
            attachments: [
                // files to use in the email template file.
                {
                    filename: 'file-name',
                    path: 'file-path',
                    cid: 'variable-name' // name by which the file will be accessed in the template.
                },
            ],
            context: {
                // data to be used in the email template file.
                variableName: 'value'
            },
        }
    }

    /**
     * Sends the email.
     */
    sendMail = () => {
        let mailOptions = this.setMailOptions();
        
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log('mail error: ' + error);
            console.log(`Message Id: ${info.messageId} | Email: '${this.constructor.name}' sent to: '${mailOptions.to}'`);
        });
    }
}

module.exports = NodemailerHandlebarEmail;