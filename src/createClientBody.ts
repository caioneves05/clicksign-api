import { Axios } from  'axios'


export const clientBody = () => new Axios({
    baseURL: 'https://sandbox.clicksign.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json; charset=utf-8'
    },
    transformRequest: (data) => JSON.stringify(data),
    transformResponse: (data) => {
        try{
            return JSON.parse(data)
        } catch(err){
            console.log(data)
        }
    }
})