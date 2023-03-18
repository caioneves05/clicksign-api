import { ClickSign } from '../src/client'
import { clientBody } from '../src/createClientBody'
import { validationKeyEnviroment } from '../src/keyValidation'

import { createDocumentBody } from '../src/types/requests'
import { docBase64 } from '../src/docBase64'

describe('Client', () => {
    let client: ClickSign
    beforeEach(() => {
        client = new ClickSign(clientBody(), validationKeyEnviroment())
    })

    jest.setTimeout(50000)

    it('should crete a new document', async () => {
        const deadline_at = new Date()
        deadline_at.setDate(deadline_at.getDate() + 1)

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
})