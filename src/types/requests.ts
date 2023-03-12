export interface createDocument {
    document: {
        path: string
        content_base64: string
        deadline_at?: string
        auto_close?: boolean
        locale?: string
        sequence_enabled?: boolean
        block_after_refusal?: boolean
    }
}

export interface createSigner {
    signer: {
        email: string
        phone_number: string
        auths: string[]
        name: string
        documentation: string
        birthday: string
        has_documentation: boolean
        selfie_enabled: boolean
        handwritten_enabled: boolean
        official_document_enabled: boolean
        liveness_enabled: boolean
        facial_biometrics_enabled: boolean
    }
}