const NodemailerHandlebarEmail = require('./index')
const path = require('path')

class WelcomeEmail extends NodemailerHandlebarEmail {

    /**
     * WelcomeEmail constructor.
     * @param {*} user 
     */
    constructor(user) {
        super();

        this.user = user
    }

    /**
     * Returns the mail options.
     */
    setMailOptions = () => {
        return {
            from: process.env.MAIL_SENDER_EMAIL || "example@example.com",
            to: this.user.email,
            subject: 'Welcome',
            template: 'welcome',
            attachments: [
                // files to use in the email template file.
                {
                    filename: 'email.png',
                    path: path.join(__dirname, '../views/email/images/email.png'),
                    cid: 'email' // name by which the file will be accessed in the template.
                },
            ],
            context: {
                // data to be used in the email template file.
                variableName: 'value'
            },
        };
    }

}

module.exports = WelcomeEmail;