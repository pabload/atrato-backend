import fetch from 'node-fetch';

export const generateCreditCard = async()=>{
    const res = await fetch(
        "https://randommer.io/api/Card",
        {
            headers:{
                'X-Api-Key': 'f3b80c8d2c6a478e89445e919e625fff'
            }
        }
    )
    const resJson = await res.json();
    return resJson;
}