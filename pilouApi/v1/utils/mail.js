const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "",
        pass: ""
    }
});

module.exports = {
    send_code_email: async (receiver, code) => {

        try{
            //TODO separate message on a email template imported on a function
            //TODO plain text message as well
            let message = '';
            let text = '';


            message+='<!DOCTYPE html>';
            message+='<html><h1>Tu código es: '+ code +'</h1></html>';

            text+='Tu código es: '+ code;

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '', // sender address
                to: receiver, // list of receivers
                subject: "Código de inicio de sesión", // Subject line
                text: "Recover password",
                html: message
            });


            //return info.messageId;
            //console.log(info.messageId);
            return "success";
        }catch(error){
            //console.error("error case; " + error);
            return "error";
        }

    },
}
