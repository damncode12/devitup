import { API_URL , API_TOKEN } from "./Urls";


export const fetchdata = async(endpoint)=>{
    const options = {
        method : 'Get',
        headers : {
            Authorization : "Bearer " + API_TOKEN
        }
    };

    const url = `${API_URL}${endpoint}`;
    const data = await fetch(url,options);
    const parseddata = await data.json();
    return parseddata; 

}

export const makepaymentreq = async(endpoint , payload)=>{
    const url = `${API_URL}${endpoint}`;
    const res = await fetch(url,{
        method : 'POST',
        headers : {
            Authorization : "Bearer " + API_TOKEN,
            "Content-Type": "application/json"
        },
        body : JSON.stringify(payload)
    })
    const data = await res.json();
    return data;
}


