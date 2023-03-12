import dotenv from 'dotenv'

dotenv.config()

export const validationKeyEnviroment = () => {
    const token = '2febcb09-c5df-46fd-875d-8818eb4ed1a6'
    if(token) {
        return token
    }else{
        throw new Error('ACESS_TOKEN is not defined!')
    }
}
