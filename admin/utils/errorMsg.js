export default (res, path, message, code) => {
  return res.redirect(`/admin/error?message=${message}&path=${path}&code=${code}`)
}