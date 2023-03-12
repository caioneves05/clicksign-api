import { Axios } from  'axios'


export const clientBody = () => new Axios({
    baseURL: 'https://sandbox.clicksign.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    transformRequest: (data) => JSON.stringify(data),
    transformResponse: (data) => {
        try{
            return JSON.parse(data)
        } catch(err){
            return err
        }
    }
})