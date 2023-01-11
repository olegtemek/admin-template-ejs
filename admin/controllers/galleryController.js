import prisma from '../../prisma/client.js'
import fs from 'fs'
import errorMsg from '../utils/errorMsg.js'


export const index = async (req, res) => {
  const galleries = await prisma.galleries.findMany()

  return res.render('gallery/index', { title: 'Галерея', galleries: galleries })
}

export const create = (req, res) => {
  return res.render('gallery/create', { title: 'Создание слайда' })
}

export const edit = async (req, res) => {
  let slide = await prisma.galleries.findFirst({
    where: {
      id: Number(req.params.id)
    }
  })
  return res.render('gallery/edit', { title: 'Редактирование слайда', slide: slide })
}

export const update = async (req, res) => {
  let slide = await prisma.galleries.findFirst({ where: { id: Number(req.params.id) } })
  if (req.file) {
    fs.unlink(`${slide.image}`, err => {
      if (err) console.log(err);
    });
  }


  await prisma.galleries.update({
    where: {
      id: slide.id
    },
    data: {
      title: req.body.title,
      image: req.file ? req.file.path : slide.path
    }
  }).then(r => {
    return res.redirect('/admin/gallery')
  }).catch(e => {
    errorMsg(res, '/admin/gallery', 'Server error, 500', 500)
  })

}



export const store = async (req, res) => {
  if (!req.file) {
    return res.render('gallery/create', { title: 'Создание слайда', error: 'Select image', })
  }

  await prisma.galleries.create({
    data: {
      image: req.file.path,
      title: req.body.title
    }
  }).then(r => {
    return res.redirect('/admin/gallery')
  }).catch(e => {
    errorMsg(res, '/admin/gallery', 'Server error, 500', 500)
  })
}

export const destroy = async (req, res) => {

  let slide = await prisma.galleries.findFirst({
    where: {
      id: Number(req.params.id)
    }
  })
  fs.unlink(`${slide.image}`, err => {
    if (err) console.log(err);
  });


  await prisma.galleries.delete({
    where: {
      id: slide.id
    }
  }).then(r => {
    return res.redirect('/admin/gallery')
  }).catch(e => {
    errorMsg(res, '/admin/category', 'Server error, 500', 500)
  })

}
