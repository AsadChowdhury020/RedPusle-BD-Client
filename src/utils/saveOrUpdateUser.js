import axios from 'axios'

const saveOrUpdateUser = async ( userData ) => {

    const result = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData)
    return result.data
}

export default saveOrUpdateUser