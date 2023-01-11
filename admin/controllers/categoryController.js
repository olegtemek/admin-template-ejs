import prisma from '../../prisma/client.js'
import errorMsg from '../utils/errorMsg.js'

export const index = async (req, res) => {
  const categories = await prisma.categories.findMany()
  return res.render('category/index', { title: 'Категории', categories: categories })
}

export const create = (req, res) => {
  return res.render('category/create', { title: 'Категории создать' })
}

export const store = async (req, res) => {
  let { title, description } = req.body;
  let slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  await prisma.categories.create({
    data: {
      title: title,
      slug: slug,
      description: description
    }
  }).then(r => {
    return res.redirect('/admin/category')
  }).catch(e => {
    errorMsg(res, '/admin/category', 'Server error, 500', 500)
  })

}

export const edit = async (req, res) => {
  const category = await prisma.categories.findFirst({
    where: {
      id: Number(req.params.id)
    }
  })

  return res.render('category/edit', { title: 'Категория изменить', category: category })
}

export const update = async (req, res) => {
  let { title, description } = req.body;
  let slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  await prisma.categories.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      title: title,
      slug: slug,
      description: description
    }
  }).then(r => {
    return res.redirect('/admin/category')
  }).catch(e => {
    errorMsg(res, '/admin/category', 'Server error, 500', 500)
  })
}

export const destroy = async (req, res) => {
  await prisma.categories.delete({
    where: {
      id: Number(req.params.id)
    }
  }).then(r => {
    return res.redirect('/admin/category')
  }).catch(e => {
    errorMsg(res, '/admin/category', 'Server error, 500', 500)
  })
}