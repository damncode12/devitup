import FetchContext from "./FetchContext";
import { useState } from "react";
import { useEffect } from "react";
import { Buffer } from "buffer";
import QueryString from "qs";
import axios from "axios";

const FetchState = (props)=>{
    const client_id = "443c9eae28b147c2a3aad22d957a2fc2";
    const client_secret = "59748730c6384bcd839c99f34f94bf8d";
    const auth_token = Buffer.from(`${client_id}:${client_secret}` , 'utf-8').toString('base64');
    const [acesstoken, setacesstoken] = useState("")
    const [authtoken, setauthtoken] = useState("");
    const [code, setcode] = useState("");
    const getAuth = async () =>{
        try {
            
            const token_url = 'https://accounts.spotify.com/api/token';
            const data  = QueryString.stringify({'grant_type':'client_credentials'});

            const response = await axios.post(token_url, data, {
                headers: { 
                  'Authorization': `Basic ${auth_token}`,
                  'Content-Type': 'application/x-www-form-urlencoded' 
                }
              })
            setacesstoken(response.data.access_token)
        } catch (error) {
            console.log("Something went wrong")            
        }
    }

    useEffect(()=>{
        getAuth();
    },[])


    return (
        <FetchContext.Provider value={{acesstoken , authtoken, setauthtoken}}>
            {props.children}
        </FetchContext.Provider>
    )
}

export default FetchState;