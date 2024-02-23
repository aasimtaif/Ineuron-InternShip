import { prisma } from "../config/prisma.config.js";

export const addRoom = async (req, res) => {
    const { hotel, roomNumber, ...otherDetails } = req.body;
    try {
        const room = await prisma.rooms.create({
            data: {
                ...otherDetails,
                hotel: { connect: { id: hotel } },
                roomNumber: {
                    create: roomNumber.map((room) => ({
                        number: room
                    }))
                }
            }
        });

        res.json(room);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating room', error });
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await prisma.rooms.findMany({
            include: {
                roomNumber: true,
                hotel: true
            }
        });

        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rooms', error });
    }
}

export const updateRoomAvailability = async (req, res) => {
    const { roomIds, dates, userId } = req.body;
    const newUnavailableDates = [new Date('2023-01-03'), new Date('2023-01-04')]
    try {

        const bookingPromises = roomIds.map(roomId => {
            return prisma.booking.create({
                data: {
                    checkIn: dates[0],
                    checkOut: dates[dates.length - 1],
                    total: 100,
                    RoomNumber: {
                        connect: {
                            id: roomId
                        }
                    },
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                }
            });
        });

        const updatedRoomNumbers = await prisma.$transaction([
            ...bookingPromises,

            prisma.roomNumber.updateMany({
                where: {
                    id: { in: roomIds }
                },
                data: {
                    unAvailableDates: {
                        push: dates
                    }
                }
            })
        ]);
        res.status(200).json({ updatedRoomNumbers });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating room numbers', error });
    }
}

export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const { ...details } = req.body;
    try {
        const room = await prisma.rooms.update({
            where: {
                id
            },
            data: {
                ...details
            }
        });

        res.json(room);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating room', error });
    }
}

export const deteleRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await prisma.$transaction([
            // Delete bookings associated with the room number
            prisma.booking.deleteMany({
                where: {
                    RoomNumber: {
                        roomId: id,
                    },
                },
            }),
            // Delete room numbers associated with the room
            prisma.roomNumber.deleteMany({
                where: {
                    roomId: id,
                },
            }),
            // Delete the room itself
            prisma.rooms.delete({
                where: {
                    id: id,
                },
            }),
        ]);

        res.json(room);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting room', error });
    }
}