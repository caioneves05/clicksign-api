import { Axios, AxiosResponse } from "axios";
import qs from 'querystring'

import { Request, Response, bodyMethods } from "./types";

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
    async notifyingSignatoryEmail(request: Request.notifying): Promise<AxiosResponse> {
      const { client, key } = this
      console.log(client, request)
      const config = qs.stringify({access_token: key})
      const notification = await client.post(`/api/v1/notifications?${config}`, request)
      const data = await notification
      return data
    }
}
