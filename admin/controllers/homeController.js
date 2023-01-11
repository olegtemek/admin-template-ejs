export const index = (req, res) => {
  return res.render('home/index', { title: 'Главная' })
}


export const error = (req, res) => {
  let data = req.query;
  if (data.path && data.message && data.code) {
    return res.render('layouts/error', { message: data.message, code: data.code, path: data.path })
  }
  return res.redirect('/admin')
}
