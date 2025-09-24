import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { ListingDataContext } from './ListingContext'
export const bookingDataContext = createContext()

const BookingContext = ({ children }) => {

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [total, setTotal] = useState(0)
    const [night, setNight] = useState(0)
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const { getListing } = useContext(ListingDataContext)
    const [bookingData, setBookingData] = useState([])

    const handleBooking = async (id) => {
        try {
            const result = await axios.post(serverUrl + `/api/booking/create/${id}`, {
                checkIn, checkOut, totalRent: total
            }, { withCredentials: true })

            await getCurrentUser
            await getListing()
            setBookingData(result.data)
            console.log(result.data)
            setCheckIn("");
            setCheckOut("");

        } catch (error) {
            console.log(error)
            setBookingData(null)

        }
    }




    const value = {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight,
        bookingData, setBookingData,
        handleBooking


    }

    return (
        <div>
            <bookingDataContext.Provider value={value}>
                {children}
            </bookingDataContext.Provider>
        </div>
    )
}

export default BookingContext 