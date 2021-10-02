const MySQL = require("../library/MySQL/reducers");
const Mailer = require("../library/Mailer/index");

const ADD_MAIL_NEWSLETTER = "ADD_MAIL_NEWSLETTER";
MySQL.addReducer(ADD_MAIL_NEWSLETTER, "INSERT INTO newsletter_mails (email) VALUES (@email)");

const GET_MAILS_NEWSLETTER = "GET_MAILS_NEWSLETTER";
MySQL.addReducer(GET_MAILS_NEWSLETTER, "SELECT * FROM newsletter_mails");

exports.addMailToNewsletter = async payload => {
    return await MySQL.executeReducer(ADD_MAIL_NEWSLETTER, {email: payload});
};

exports.sendNewsletter = async payload => {
    const Mails = await MySQL.executeReducer(GET_MAILS_NEWSLETTER, {});

    for (const Mail of Mails) {
        Mailer.send(Mail, payload.title, payload.content);
    }

    return true;
};
