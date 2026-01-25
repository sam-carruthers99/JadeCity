// const express = require('express')
// const nodemailer = require('nodemailer')
// const router = express.Router()
// require('dotenv').config()

// router.use(express.urlencoded({ extended: true }))
// router.use(express.json())

// router.post('/', (req, res) => {
//     console.log('Incoming request body:', req.body)
//     const {
//         firstName,
//         lastName,
//         emailAddress,
//         trackName,
//         artistName,
//         linkUpload,
//         additionalInfo,
//     } = req.body

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     })

//     const mailOptions = {
//         from: process.env.EMAIL_FROM,
//         to: process.env.EMAIL_TO,
//         subject: 'New Song Submission',
//         text: `You have received a new demo from ${firstName} ${lastName}.
          
//           Email: ${emailAddress}
//           Track Name: ${trackName}
//           Artist Name: ${artistName}
//           Additional Info: ${additionalInfo}
          
//           You can listen to the track here: ${linkUpload}`,
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).json({ message: error.toString() })
//         }

//         res.json('Email sent: ' + info.response)
//     })
// })

// module.exports = router

const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const mailgun = require('mailgun-js')

router.post('/', async (req, res) => {
  try {
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      throw new Error('Missing Mailgun environment variables!')
    }

    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    })

    const {
      firstName,
      lastName,
      emailAddress,
      trackName,
      artistName,
      linkUpload,
      additionalInfo,
    } = req.body

    console.log('Incoming request body:', req.body)

    if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      throw new Error('Missing EMAIL_FROM or EMAIL_TO environment variables!')
    }

    const data = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Song Submission',
      text: `You have received a new demo from ${firstName} ${lastName}.

Email: ${emailAddress}
Track Name: ${trackName}
Artist Name: ${artistName}
Additional Info: ${additionalInfo}

You can listen to the track here: ${linkUpload}`,
    }

    mg.messages().send(data, (error, body) => {
      if (error) {
        console.error('Mailgun send error:', error)
        return res.status(500).json({ message: error.toString() })
      }

      console.log('Email sent successfully:', body)
      res.status(200).json({ message: 'Email sent!', body })
    })
  } catch (err) {
    console.error('Email route error:', err)
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.toString(),
    })
  }
})

module.exports = router;
