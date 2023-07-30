import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) return res.status(400).json({ msg: "silahkan login ke akun anda" });
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.session.userId) }
        });

        if (!user) res.status(404).json({ msg: 'user tidak ditemukan' });

        req.userId = user.id;
        req.role = user.role;
        next()
    } catch (error) {
        res.status(500).json({ msg: 'terjadi error pada server' });
        console.log(error);
    };
};

export const staffOnly = async (req, res, next) => {
    try {
        const staff = await prisma.user.findUnique({
            where: { id: parseInt(req.session.userId) }
        });

        if (!staff) res.status(404).json({ msg: 'user tidak ditemukan' });
        if (req.role !== 'staff') return res.status(403).json({ msg: 'akses terlarang' });
        next();
    } catch (error) {
        res.status(500).json({ msg: 'terjadi error pada server' });
        console.log(error)
    };
};

