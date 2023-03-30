import { ClickSign } from '../src/client'
import { clientBody } from '../src/createClientBody'
import { validationKeyEnviroment } from '../src/keyValidation'

import { createDocumentBody, createSigner, addSignTheDocument } from '../src/types/requests'
import { docBase64 } from '../src/docBase64'
import { bodyCreateDocument, bodyCreateSigner, bodyNotifySigner } from '../src/types/bodyMethods'
import { HttpStatusCode } from 'axios'

describe('Client', () => {
    let client: ClickSign
    beforeEach(() => {
        client = new ClickSign(clientBody(), validationKeyEnviroment())
    })

    jest.setTimeout(50000)

    it('should crete a new document', async () => {
        const deadline_at = new Date()
        deadline_at.setDate(deadline_at.getDate() + 20)

        const body = {
            document: {
                path: '/testeDocument.pdf',
                deadline_at: deadline_at.toISOString(),
                content_base64: docBase64,
                auto_close: true,
                locale: 'pt-BR',
                sequence_enabled: false,
                block_after_refusal: true
            }
        } as createDocumentBody

        const  newDocument  = await client.createDocument(body)
        
        expect(newDocument).toEqual(
            expect.objectContaining({
                document: expect.objectContaining({
                    path: body.document.path,
                    locale: 'pt-BR'
                })
            })
        )
    })

    it('should create a new signer', async () => {
        const body = {
            signer: {
                email: "Ncaio037@gmail.com",
                phone_number: "11999629173",
                auths: [
                  "sms"
                ],
                name: "Caio Neves",
                documentation: "48858045823",
                birthday: "2003-04-05",
                has_documentation: true,
                selfie_enabled: false,
                handwritten_enabled: false,
                official_document_enabled: false,
                liveness_enabled: false,
                facial_biometrics_enabled: false
              }
        } as createSigner

        const newSginer = await client.createSigner(body)
        const keyUser = newSginer.signer.key
        console.log(keyUser)

        expect(newSginer).toEqual(
            expect.objectContaining({
                signer: expect.objectContaining({
                    email: body.signer.email,
                    auths: expect.arrayContaining(body.signer.auths)
                })
            })
        )
    })

    it('should add a signer to the document.', async () => {
        const createDocument = await client.createDocument(bodyCreateDocument)
        const createSigner = await client.createSigner(bodyCreateSigner)

        const documentKey = createDocument.document.key
        const signerKey = createSigner.signer.key

        const body = {
            list: {
                document_key: documentKey,
                signer_key: signerKey,
                sign_as: 'sign',
                refusable: true,
                message: 'Prezado Caio,Por favor assine o documento.'
              } 
        } as addSignTheDocument

        const result = await client.AddSignToDocument(body)

        expect(result).toEqual(
            expect.objectContaining({
                list: expect.objectContaining({
                    sign_as: body.list.sign_as,
                    refusable: body.list.refusable,
                    message: body.list.message,
                })
            })
        )

    })

    it('shold notify the signer to sign the document via sms', async () => {
        const createNewSigner = await client.createSigner(bodyCreateSigner)
        const key = createNewSigner.signer.key
        const body = {
            request_signature_key: 'd51c15c4-9477-45e7-bd9f-66c16a182f58',
        }

        const notification = await client.notifyingSignatorySMS(body)

        expect(clientBody).toBe(202)
    })
})
