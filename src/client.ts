import { Axios, AxiosResponse } from "axios";
import qs from 'querystring'

import { Request, Response, bodyMethods } from "./types";
import { clientBody } from "./createClientBody";
import { validationKeyEnviroment } from "./keyValidation";

export interface ClickSignClient {
    client: Axios
    key: string
    createDocument: (request: Request.createDocumentBody,) => Promise<Response.createDocument>
    createSigner: (request: Request.createSigner,) => Promise<Response.createSigner>
    AddSignToDocument: (request: Request.addSignTheDocument,) => Promise<Response.AddSignToDocument>
    notifyingSignatory: (request: Request.notifying,) => Promise<Response.notification>
}

export class ClickSign implements ClickSignClient {
    client: Axios
    key: string

    constructor(client: Axios, key: string){
        if(!key) {
            throw new Error('Parameter token is not set.')
        }
        this.client = client
        this.key = key
    }

    private errorResponse = (response: AxiosResponse) => {
      if(response.data.errors) {
          console.error(response.data.errors)
          throw new Error()
      }
    }

    async createDocument(request: Request.createDocumentBody) {
        const { client, key } = this
        const config = qs.stringify({access_token: key})

        const result = await client.post(`/api/v1/documents?${config}`, request)
        this.errorResponse(result)
        return await result.data
    }

    async createSigner(request: Request.createSigner) {
      const { client, key } = this
      const config = qs.stringify({access_token: key})

      const result = await client.post(`/api/v1/signers?${config}`, request)
      return await result.data
    }

    async AddSignToDocument(request: Request.addSignTheDocument) {
        const { client, key } = this
        const config = qs.stringify({access_token: key})

        const result = await client.post(`/api/v1/lists?${config}`, request)
        return await result.data
    }
    async notifyingSignatory(request: Request.notifying) {
      const { client, key } = this
      const config = qs.stringify({access_token: key})

      const notification = await client.post(`/api/v1/notifications?${config}`, request)
      return await notification.data
    }
}

const body = {
  request_signature_key: '6e1660f0-908d-4f04-befa-2cff0c4359d2',
  message: 'Caro cliente, Por favor, assine este documento o mais breve possível para que possamos dar seguimento ao processo. Agradecemos sua cooperação.Atenciosamente, Equipe responsável.',
  url: 'https://github.com/caioneves05'
}


const result = new ClickSign(clientBody(), validationKeyEnviroment()).notifyingSignatory(body)

result.then((result) => {
    console.log(result); // faz algo com o resultado
  }).catch((error) => {
    console.error(error); // lida com erros
  });