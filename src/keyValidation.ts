import dotenv from 'dotenv'

dotenv.config()

export const validationKeyEnviroment = () => {
    const token = process.env.CLICKSIGN_TOKEN
    if(token) {
        return token
    }else{
        throw new Error('ACESS_TOKEN is not defined!')
    }
}
