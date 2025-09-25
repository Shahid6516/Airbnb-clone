import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ListingDataContext = createContext()

const ListingContext = ({ children }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [frontendImage1, setFrontendImage1] = useState(null)
    const [frontendImage2, setFrontendImage2] = useState(null)
    const [frontendImage3, setFrontendImage3] = useState(null)
    const [backEndImage1, setBackendImage1] = useState(null)
    const [backEndImage2, setBackendImage2] = useState(null)
    const [backEndImage3, setBackendImage3] = useState(null)
    const [rent, setRent] = useState("")
    const [city, setCity] = useState("")
    const [landmark, setLandMark] = useState("")
    const [category, setCategory] = useState("")
    const [adding, setAdding] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [deleteing, setDeleting] = useState(false)
    const [listingData, setListingData] = useState([])
    const [newListData, setNewListData] = useState([])
    const [cardDetails, setCardDetails] = useState(null)

    const { serverUrl } = useContext(authDataContext)
    const navigate = useNavigate()

    // Add listing
    const handleAddListing = async () => {
        setAdding(true)
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("image1", backEndImage1)
            formData.append("image2", backEndImage2)
            formData.append("image3", backEndImage3)
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landmark", landmark)
            formData.append("category", category)

            await axios.post(serverUrl + "/api/listing/add", formData, { withCredentials: true })

            // Reset form
            setTitle(""); setDescription(""); setFrontendImage1(null)
            setFrontendImage2(null); setFrontendImage3(null)
            setBackendImage1(null); setBackendImage2(null); setBackendImage3(null)
            setRent(""); setCity(""); setLandMark(""); setCategory("")
            setAdding(false)

            // Refresh listings after adding
            getListing()
            navigate("/")
            toast.success("Added listing Successfully")


        } catch (error) {
            setAdding(false)
            console.log(error)
            toast.error(error.response.data.message)

        }
    }

    const handleViewCard = async (id) => {
        try {
            const result = await axios.get(serverUrl + `/api/listing/findlistingByid/${id}`, { withCredentials: true })
            console.log(result.data)
            setCardDetails(result.data)
            navigate("/viewcard")
        } catch (error) {
            console.log(error)

        }

    }

    // Get all listings
    const getListing = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/listing/get", { withCredentials: true })
            console.log("Backend response:", result.data)
            setListingData(result.data)
            setNewListData(result.data)





        } catch (error) {
            console.log(error)
            setListingData([])
        }
    }

    useEffect(() => {
        getListing()
    }, [adding, updating, deleteing])

    const value = {
        title, setTitle,
        description, setDescription,
        frontendImage1, setFrontendImage1,
        frontendImage2, setFrontendImage2,
        frontendImage3, setFrontendImage3,
        backEndImage1, setBackendImage1,
        backEndImage2, setBackendImage2,
        backEndImage3, setBackendImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandMark,
        category, setCategory,
        handleAddListing,
        adding, setAdding,
        listingData, setListingData,
        getListing,
        newListData, setNewListData,
        handleViewCard,
        cardDetails, setCardDetails,
        updating, setUpdating, setDeleting
    }

    return (
        <ListingDataContext.Provider value={value}>
            {children}
        </ListingDataContext.Provider>
    )
}

export default ListingContext
