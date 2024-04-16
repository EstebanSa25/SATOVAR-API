"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    postToProvider;
    transporter;
    constructor(mailerService, mailerEmail, senderEmailPassword, postToProvider) {
        this.postToProvider = postToProvider;
        this.transporter = nodemailer_1.default.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            },
        });
    }
    async sendEmail(options) {
        const { to, subject, htmlBody, attachements = [] } = options;
        try {
            if (!this.postToProvider)
                return true;
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.EmailService = EmailService;
