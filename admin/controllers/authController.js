import * as dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import prisma from "../../prisma/client.js";
import bcrypt from 'bcrypt'


export const index = async (req, res) => {
  return res.render('auth/login', { error: null })
}

export const login = async (req, res) => {
  const body = req.body;

  let user = await prisma.users.findFirst({ where: { email: body.email } })

  if (!user) {
    return res.render('auth/login', {
      error: 'Пользователь не найден'
    })
  }

  let match = await bcrypt.compare(body.password, user.password)

  if (!match) {
    return res.render('auth/login', {
      error: 'Неправильный пароль'
    })
  }
  if (user.role == 1) {
    let token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET, { expiresIn: 60 * 60 * 24 })
    res.cookie('token', token)
    return res.redirect('/admin/')
  } else {
    return res.render('auth/login', { error: "Недостаточно прав у пользователя" })
  }
}