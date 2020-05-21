const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')


const transporter = new nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'erik.cassin90@ethereal.email',
      pass: 'FW9PTXUp4y4qnNDdqe'
  }
})

transporter.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/templates/mail'),
  extname: '.html'
}))

module.exports = transporter;