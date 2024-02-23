import { prisma } from "../config/prisma.config.js";

export const addHotel = async (req, res) => {
    try {
        const hotel = await prisma.hotel.create({
            data: {
                ...req.body
            }
        });

        res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: 'Error creating hotel', error });
    }
}

export const getHotel = async (req, res) => {
    const { ...conditions } = req.query;
    try {
        const hotel = await prisma.hotel.findMany({
            where: {
                ...conditions
            },
            include: {
                rooms: true,
            },
        });
        res.json(hotel);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error retrieving hotels', error });
    }
}
export const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { ...details } = req.body;
    try {
        const hotel = await prisma.hotel.update({
            where: {
                id
            },
            data: {
                ...details
            }
        });

        res.json(hotel);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating hotel', error });
    }
}

export const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch related room IDs
        const roomIds = await prisma.rooms.findMany({
            where: {
                hotelId:
                    id

            },
            select: {
                id: true,
            },
        });

        // Extract room IDs from the result
        const roomIdsToDelete = roomIds.map((room) => room.id);
        console.log(roomIdsToDelete)
        // Use Prisma transaction to ensure atomicity
        await prisma.$transaction([
            // Delete bookings associated with room numbers associated with rooms in the hotel
            prisma.booking.deleteMany({
                where: {
                    RoomNumber: {
                        roomId: {
                            in: roomIdsToDelete,
                        },
                    },
                },
            }),
            // Delete room numbers associated with rooms in the hotel
            prisma.roomNumber.deleteMany({
                where: {
                    roomId: {
                        in: roomIdsToDelete,
                    },
                },
            }),
            // Delete rooms associated with the hotel
            prisma.rooms.deleteMany({
                where: {
                    hotelId: id,
                },
            }),
            // Delete the hotel itself
            prisma.hotel.deleteMany({
                where: {
                    id: id,
                },
            }),
        ]);

        // console.log(`Hotel with ID ${id} and its associated data have been deleted.`);
        res.status(200).json(`Hotel with ID ${id} and its associated data have been deleted.`);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting hotel', error });
    }
}