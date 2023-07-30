import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error("Error saat mengambil daftar users:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil daftar users." });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }

        res.json(user);
    } catch (error) {
        console.error("Error saat mengambil user by ID:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil user." });
    }
};

export const createUser = async (req, res) => {
    const { name, role } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                role: role,
            },
        });

        res.json({ message: "User berhasil dibuat.", user: newUser });
    } catch (error) {
        console.error("Error saat membuat user:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat membuat user." });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, role, staffPassword } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                role,
                staffPassword,
            },
        });

        res.json({ message: "User berhasil diperbarui.", user: updatedUser });
    } catch (error) {
        console.error("Error saat memperbarui user by ID:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat memperbarui user." });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({ message: "User berhasil dihapus." });
    } catch (error) {
        console.error("Error saat menghapus user by ID:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus user." });
    }
};

export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          isUsed: true,
        },
      });
  
      res.json({ msg: "Status akun berhasil diperbarui." });
    } catch (error) {
      console.error("Error saat memperbarui status akun:", error);
      res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui status akun." });
    }
  };