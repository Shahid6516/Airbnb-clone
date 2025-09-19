import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
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
    const { serverUrl } = useContext(authDataContext)



    const handleAddListing = async () => {
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

            const result = await axios.post(serverUrl + "/api/listing/add", formData, { withCredentials: true })
            console.log(result)
        } catch (error) {
            console.log(error)

        }
    }

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
        handleAddListing

    }
    return (
        <div>
            <ListingDataContext.Provider value={value}>
                {children}
            </ListingDataContext.Provider>
        </div>
    )
}

export default ListingContext