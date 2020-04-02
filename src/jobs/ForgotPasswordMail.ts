import Mail from '../lib/Mail';

class CancellationMail {
  get key() {
    return 'ForgotPasswordMail';
  }

  async handle({ data }) {
    const { email, token, name } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'redefinição se senha',
      template: 'forgot',
      context: {
        token: token,
        user: name,
      },
    });
  }
}

export default new CancellationMail();
