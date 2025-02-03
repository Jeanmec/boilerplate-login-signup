import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { join } from 'path';

const mailTemplates = {
  'verification-code': {
    title: 'Vérification de votre adresse email',
    file: 'verificationCode',
  },
  'reset-password': {
    title: 'Réinitialisation de votre mot de passe',
    file: 'resetPassword',
  },
};

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: process.env.NODEMAILER_SECURE,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
      },
    });
  }

  async sendMail(
    to: string,
    templateId: keyof typeof mailTemplates,
    data: any,
  ): Promise<void> {
    const MAIL_DATA = mailTemplates[templateId];

    const HTML_MAIL = await this.getHtmlTemplate(MAIL_DATA.file, data);

    try {
      const mailOptions = {
        from: process.env.NODEMAIL_CONTACT_HEADER,
        to,
        subject: MAIL_DATA.title,
        html: HTML_MAIL,
      };

      await this.transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
          console.log(err);
          return false;
        } else {
          return true;
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      throw error;
    }
  }

  async getHtmlTemplate(
    templateFileName: string,
    data: any,
  ): Promise<string | boolean> {
    if (templateFileName) {
      const filePath = join(
        process.cwd(),
        'src',
        'templates',
        `${templateFileName}.ejs`,
      );

      try {
        return await ejs.renderFile(filePath, { data });
      } catch (error) {
        console.error('Erreur lors du rendu du template EJS :', error);
        throw error;
      }
    } else {
      return false;
    }
  }
}
