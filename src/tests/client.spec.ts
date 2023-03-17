import { ClickSign } from '../client'
import { clientBody } from '../createClientBody'
import { validationKeyEnviroment } from "../keyValidation";

import { createDocumentBody } from '../types/requests'
import { docBase64 } from '../docBase64'

describe('Client', () => {
    const client = new ClickSign(clientBody(), validationKeyEnviroment())

    it('should crete a new document', async () => {
        const body = {
            document: {
                path: '/testeDocument.pdf',
                content_base64: docBase64,
                deadline_at: '2023-05-06T14:30:59-03:00',
                auto_close: true,
                locale: 'pt-BR',
                sequence_enabled: false,
                block_after_refusal: true
            }
        }
        const { newDocument } = await client.createDocument(body)

        expect(newDocument).toEqual(
            expect.objectContaining({
                document: expect.objectContaining({
                    path: body.document.path,
                    filename: 'testeDocument.pdf'
                })
            })
        )
    })
})