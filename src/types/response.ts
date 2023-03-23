export interface createDocument {
    document: {
        key: string
        path: string
        filename: string
        uploaded_at: string
        updated_at: string
        finished_at: null | boolean
        deadline_at: string | Date
        status: string
        auto_close: boolean
        locale: string
        metadata: object
        sequence_enabled: boolean
        signable_group: null | boolean
        remind_interval: null | boolean
        block_after_refusal: boolean
        downloads: object
        template: null | object
        signers: []
        events: []
    }
}

export interface createSigner {
    signer: {
        key: string
        email: string
        auths: []
        name: string
        documentation: string
        birthday: string
        phone_number: string
        has_documentation: boolean
        selfie_enabled: boolean
        handwritten_enabled: boolean
        official_document_enabled:boolean
        liveness_enabled: boolean
        facial_biometrics_enabled: boolean
        created_at: string
        updated_at: string
    }
}

export interface AddSignToDocument {
    list: {
        key: string,
        request_signature_key: string,
        document_key: string,
        signer_key: string,
        sign_as: string,
        refusable: true,
        created_at: string,
        updated_at: string,
        url: string,
        message: string
      }
}

export interface notification {}