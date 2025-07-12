import axios from "axios"


export const ImageUpload = async (image) => {
    const formdata = new FormData()
    formdata.append('image', image)
    try {
        const result = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, formdata)
        return result?.data?.data?.display_url
    }
    catch (error) {
        console.log(error)
    }
}