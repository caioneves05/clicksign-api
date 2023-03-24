import { Axios, AxiosResponse } from "axios";
import qs from 'querystring'

import { Request, Response, bodyMethods } from "./types";
import { clientBody } from "./createClientBody";
import { validationKeyEnviroment } from "./keyValidation";

export interface ClickSignClient {
    client: Axios
    key: string
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

    async createDocument(request: Request.createDocumentBody): Promise<Response.createDocument> {
        const { client, key } = this
        const config = qs.stringify({access_token: key})

        const result = await client.post(`/api/v1/documents?${config}`, request)
        this.errorResponse(result)
        return await result.data
    }

    async createSigner(request: Request.createSigner): Promise<Response.createSigner> {
      const { client, key } = this
      const config = qs.stringify({access_token: key})

      const result = await client.post(`/api/v1/signers?${config}`, request)
      return await result.data
    }

    async AddSignToDocument(request: Request.addSignTheDocument): Promise<Response.AddSignToDocument> {
        const { client, key } = this
        const config = qs.stringify({access_token: key})

        const result = await client.post(`/api/v1/lists?${config}`, request)
        return await result.data
    }
    async notifyingSignatorySMS(request: Request.notifying): Promise<AxiosResponse> {
      const { client, key } = this
      const config = qs.stringify({access_token: key})

      const notification = await client.post(`/api/v1/notify_by_sms?${config}`, request)
      const data = await notification.data
      return data
    }
}

const body = {
    request_signature_key: 'd51c15c4-9477-45e7-bd9f-66c16a182f58'
}

function execute() {
    new ClickSign(clientBody(), validationKeyEnviroment())
      .notifyingSignatorySMS(body)
      .then((result) => {
        console.log('Resultado da notificação SMS:',result);
        // Aqui dentro você pode trabalhar com o resultado retornado pela promise
      })
      .catch(error => {
        if (error.response && error.response.status === 200 && error.response.data.length === 0) {
          console.error('Resposta vazia do servidor');
        } else if (error.response && error.response.data) {
          console.error(`Erro ao processar resposta do servidor: ${error.response.data}`);
        } else {
          console.error(`Erro na solicitação: ${error.message}`);
        }
      });
    
}

execute()