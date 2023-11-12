import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getOrders = async (req, res) => {
    try {
        const response = await prisma.order.findMany({
            include: {
                menu: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        category: true,
                        quantity: true,
                        url: true
                    }
                }
            }
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const response = await prisma.order.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { menu: true }
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createOrder = async (req, res) => {
    const { customerName, menu, totalAmount, table } = req.body;
    try {
        const orderResponse = await prisma.order.create({
            data: {
                customerName: customerName,
                totalAmount: parseInt(totalAmount),
                meja: table
            },
        });
        const orderId = orderResponse.id;

        const formattedMenu = menu.map((item) => ({
            name: item.name,
            price: item.price,
            category: item.category,
            quantity: item.quantity,
            file: item.file,
            url: item.url,
            stock: item.stock,
            order_id: orderId,
        }));

        const menuResponse = await prisma.menu.createMany({
            data: formattedMenu,
            skipDuplicates: true
        });

        const response = {
            ...orderResponse,
            menu: menuResponse,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
        console.log(error)
    }
};




export const updateOrder = async (req, res) => {
    const { customerName, menu } = req.body;
    const { id } = req.params;
    try {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) }
        });

        const response = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                customerName: customerName || order.customerName,
                menu: menu || order.menu
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);

        await prisma.menu.deleteMany({
            where: {
                order_id: orderId,
            },
        });

        await prisma.order.delete({
            where: {
                id: orderId,
            },
        });

        res.status(200).json({ msg: "Order deleted successfully." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

