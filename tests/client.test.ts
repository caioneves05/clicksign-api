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

    jest.setTimeout(80000)

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
                  "email"
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

        const result = await client.AddSignerToDocument(body)
        console.log(result.list.request_signature_key)

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
        //Fluxo para adicionar o signatário ao documento
        const createDocument = await client.createDocument(bodyCreateDocument)
        const createSigner = await client.createSigner(bodyCreateSigner)

        const documentKey = createDocument.document.key
        const signerKey = createSigner.signer.key
        const bodyAddSigner = {
            list: {
                document_key: documentKey,
                signer_key: signerKey,
                sign_as: 'sign',
                refusable: true,
                message: 'Prezado Caio,Por favor assine o documento.'
              } 
        } as addSignTheDocument

        //Iniciando a notificação

        const addToSignerToDocument = await client.AddSignerToDocument(bodyAddSigner)

        const request_signature_key = await addToSignerToDocument.list.request_signature_key
        const body = {
            request_signature_key: request_signature_key,
            message: 'Assine esse documento.',
        }
        if(!body || body === undefined) {
            throw new Error('Body is a Error!')
        }

        if(!body.request_signature_key || body.request_signature_key === undefined) {
            throw new Error('Signature Key is not defined!')
        }

        const notification = await client.notifyingSignatoryEmail(body)

        expect(notification.status).toBe(202)
    })
})