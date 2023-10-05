import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const useFetch = (token , param) =>{
    
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState(false)
    const [data, setdata] = useState("");

    const getplaylist = async()=>{
        setisLoading(true)
        const access_token = await token ;

        const api_url = `https://api.spotify.com/v1/${param}`;

        const options = {
            headers: {
                'Authorization': `Bearer ${access_token}`
              }
        }

        try {
            seterror(false)
            const response = await axios.request(api_url , options);
            setdata(response.data)
            setisLoading(false)
        } catch (error) {
            seterror(true)
            console.log("Something went wrong")
        }

    }

    useEffect(()=>{
        getplaylist();
    },[token])

    return {data ,isLoading , error , setdata , seterror , setisLoading}
}

export default useFetch ;