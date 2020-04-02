import * as nodemailer from 'nodemailer';
import * as exphbs from 'express-handlebars';
import * as nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import mailConfig from '../config/mail';

type Options = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}

class Mail {
  private transporter: nodemailer.Transporter

  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport<Options>({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
