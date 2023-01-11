import * as dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {

  if (req.cookies.token) {
    let token = req.cookies.token

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        if (req.url != '/auth') {
          return res.redirect('/admin/auth')
        }
        return next()
      }
      if (decoded.role == 1) {
        return next()
      } else {
        if (req.url != '/auth') {
          return res.redirect('/admin/auth')
        }
        return next()
      }

    })


  } else {
    if (req.url != '/auth') {
      return res.redirect('/admin/auth')
    } else {
      next()
    }
  }

}