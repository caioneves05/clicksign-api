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

    async AddSignerToDocument(request: Request.addSignTheDocument): Promise<Response.AddSignToDocument> {
        const { client, key } = this
        const config = qs.stringify({access_token: key})

        const result = await client.post(`/api/v1/lists?${config}`, request)
        return await result.data
    }
    async notifyingSignatorySMS(request: Request.notifying): Promise<AxiosResponse> {
      const { client, key } = this
      console.log(client, request)
      const config = qs.stringify({access_token: key})
      const notification = await client.post(`/api/v1/notify_by_sms?${config}`, request)
      const data = await notification
      return data
    }
}

async function signatureKey() {
  const key = await new ClickSign(clientBody(), validationKeyEnviroment()).createSigner(bodyMethods.bodyCreateSigner)
  .then((resp) => resp.signer.key)
  .catch((err) => err)
}

async function createDocument() {
  const key = await new ClickSign(clientBody(), validationKeyEnviroment()).createDocument(bodyMethods.bodyCreateDocument)
  .then((resp) => resp.document.key)
  .catch((err) => err)
}

const AddSignerToDocumentBody = {
  list: {
      document_key: createDocument(),
      signer_key: signatureKey(),
      sign_as: 'sign',
      refusable: true,
      message: 'Prezado Caio,Por favor assine o documento.'
    } 
}

async function addSignerAtDocument() {
  const result = await new ClickSign(clientBody(), validationKeyEnviroment()).AddSignerToDocument(AddSignerToDocumentBody)
  .then((resp) => resp)
  .catch((err) => err)
}
//depois arrumar a tipagem de notify e addSignTheDocument.

const body = {
    request_signature_key: signatureKey(),
    message: 'Assine esse documento.'
}

async function execute() {
     new ClickSign(clientBody(), validationKeyEnviroment()).notifyingSignatorySMS(body)
      .then((result) => {
        console.log('Resultado da notificação:', result.status);
      })
      .catch((error) => {
        return error
      })
}

