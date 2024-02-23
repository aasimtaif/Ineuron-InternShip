import { prisma } from "../config/prisma.config.js"
export const getBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            select: {
                checkIn: true,
                checkOut: true,
                total: true,
                RoomNumber: {
                    select: {
                        number: true,
                        room: {
                            select: {
                                title: true,
                                desc: true,
                                hotel: {
                                    select: {
                                        name: true,
                                        type: true,
                                        title: true,
                                        address: true,
                                        city: true,

                                        photos: true
                                    }
                                }
                            }
                        }
                    },
                },
                user: {
                    select: {
                        userName: true,
                        email: true,
                        phone: true,
                        city: true,
                        country: true,
                        img: true
                    }
                }
            }
        });
        const bookingDetails = [...bookings]?.map(booking => {
            return {
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                total: booking.total,
                RoomNumber: booking.RoomNumber.number,
                room: booking.RoomNumber.room.title,
                roomDesc: booking.RoomNumber.room.desc,
                hotel: booking.RoomNumber.room.hotel.name,
                type: booking.RoomNumber.room.hotel.type,
                title: booking.RoomNumber.room.hotel.title,
                address: booking.RoomNumber.room.hotel.address,
                city: booking.RoomNumber.room.hotel.city,
                photos: booking.RoomNumber.room.hotel.photos,
                user: { ...booking.user }
            }
        })
        res.json(bookingDetails);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching bookings', error });
    }
} 