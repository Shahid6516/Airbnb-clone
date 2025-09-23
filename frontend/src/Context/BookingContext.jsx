import { createContext, useState } from 'react'
export const bookingDataContext = createContext()

const BookingContext = ({ children }) => {

    const [checkIn, setCheckIn] = useState("")
    const [CheckOut, setCheckOut] = useState("")
    const [total, setTotal] = useState(0)
    const [night, setNight] = useState(0)


    const value = {
        checkIn, setCheckIn,
        CheckOut, setCheckOut,
        total, setTotal,
        night, setNight,


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