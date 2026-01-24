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
const nodemailer = require('nodemailer')
const router = express.Router()
require('dotenv').config()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post('/', async (req, res) => {
  try {
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

    // 1️⃣ Check environment variables
    const requiredEnvs = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO']
    for (const key of requiredEnvs) {
      if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`)
      }
    }

    // 2️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 3️⃣ Compose email
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Song Submission',
      text: `You have received a new demo from ${firstName} ${lastName}.

Email: ${emailAddress}
Track Name: ${trackName}
Artist Name: ${artistName}
Additional Info: ${additionalInfo}

You can listen to the track here: ${linkUpload}`,
    }

    // 4️⃣ Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.response)

    res.status(200).json({ message: 'Email sent!', info: info.response })
  } catch (err) {
    console.error('Error sending email:', err)
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.toString(),
    })
  }
})

module.exports = router
