import axios from 'axios'
import { createContext, use, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { ListingDataContext } from './ListingContext'
import { useNavigate } from 'react-router-dom'
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

    const [booking, setBooking] = useState(false)

    const navigate = useNavigate()
    const handleBooking = async (id) => {
        setBooking(true)
        try {
            const result = await axios.post(serverUrl + `/api/booking/create/${id}`, {
                checkIn, checkOut, totalRent: total
            }, { withCredentials: true })

            await getCurrentUser
            await getListing()
            setBookingData(result.data)
            setBooking(false)
            navigate("/booked")

            // console.log(result.data)
            // setCheckIn("");
            // setCheckOut("");

        } catch (error) {
            console.log(error)
            setBookingData(null)
            setBooking(false)


        }
    }



    const cancelBooking = async (id) => {
        try {
            const result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, { withCredentials: true })
            await getCurrentUser
            await getListing()
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }

    }


    const value = {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight,
        bookingData, setBookingData,
        handleBooking, cancelBooking,booking,setBooking


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