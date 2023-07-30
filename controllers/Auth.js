import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const StaffLogin = async (req, res) => {
  const { password } = req.body;

  try {
    const staff = await prisma.user.findFirst({
      where: {
        name: req.body.name,
        role: "staff",
      },
    });

    if (!staff) {
      return res.status(404).json({ message: "User staff tidak ditemukan." });
    }

    if (staff.staffPassword !== password) {
      return res.status(401).json({ message: "Password salah." });
    }

    req.session.userId = staff.id;

    const id = staff.id
    const name = staff.name
    const role = staff.role
    res.json({ id, name, role});
  } catch (error) {
    console.error("Error saat proses login staff:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat login." });
  }
};

export const UserLogin = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: req.body.name,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    req.session.userId = user.id;

    const id = user.id;
    const name = user.name;
    const role = user.role;
    res.json({ id, name, role});

    console.log('loged in')
  } catch (error) {
    console.error("Error saat proses login user:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat login." });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error saat proses logout:", err);
      res.status(500).json({ message: "Terjadi kesalahan saat logout." });
    } else {
      res.clearCookie("connect.sid");
      res.json({ message: "Logout berhasil." });
    }
  });
};

export const Me = async (req, res) => {
  try {
    const user = req.session.userId;
    if (!user) return res.status(400).json({ msg: 'silahkan login terlebih dahulu' });
    res.json(user);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};