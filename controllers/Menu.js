import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const getMenus = async (req, res) => {
    try {
        const response = await prisma.menu.findMany();
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getMenuById = async (req, res) => {
    try {
        const response = await prisma.menu.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createMenu = async (req, res) => {
    if (!req.files.file) return res.status(400).json({ msg: 'no file uploaded' });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (fileSize >= 5000000)
        return res.status(400).json({ msg: 'image must be less than 5MB' });
    if (!allowedTypes.includes(ext.toLowerCase()))
        return res.status(400).json({ msg: 'invalid image' });

    const { name, price, category } = req.body;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    file.mv(`./public/images/${fileName}`, async (error) => {
        if (error) return res.status(500).json({ msg: error.message });
        try {
            await prisma.menu.create({
                data: { name: name, price: parseInt(price), category: category, url: url, file: fileName },
            });
            res.status(201).json({ msg: 'Menu created successfully' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
};

export const updateMenu = async (req, res) => {
  try {
    const menuId = parseInt(req.params.id);
    let { name, category, price } = req.body;
    let fileName = null;
    let url = null;

    const menu = await prisma.menu.findUnique({ where: { id: menuId } });

    if (!menu) {
      return res.status(404).json({ msg: 'Menu not found' });
    }

    name = name || menu.name;
    category = category || menu.category;
    price = price || menu.price;

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedTypes = ['.png', '.jpg', '.jpeg'];

      if (fileSize >= 5000000) {
        return res.status(400).json({ msg: 'Image must be less than 5MB' });
      }

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(400).json({ msg: 'Invalid image' });
      }

      url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

      if (menu.file) {
        fs.unlinkSync(`./public/images/${menu.file}`);
      }

      file.mv(`./public/images/${fileName}`, async (error) => {
        if (error) {
          return res.status(500).json({ msg: error.message });
        }

        try {
          await prisma.menu.update({
            where: { id: menuId },
            data: { name, price: parseInt(price), category, url, file: fileName },
          });
          res.status(200).json({ msg: 'Menu updated successfully' });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
      });
    } else {
      try {
        await prisma.menu.update({
          where: { id: menuId },
          data: { name, price: parseInt(price), category, url: menu.url, file: menu.file },
        });
        res.status(200).json({ msg: 'Menu updated successfully' });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const deleteMenu = async (req, res) => {
    try {
        const menu = await prisma.menu.findUnique({where:{id: parseInt(req.params.id)}})
        fs.unlinkSync(`./public/images/${menu.file}`)
        await prisma.menu.delete({where:{id: parseInt(req.params.id)}})
        res.status(200).json({ msg: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
