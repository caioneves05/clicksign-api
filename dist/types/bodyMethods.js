"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyNotifySigner = exports.bodyCreateSigner = exports.bodyCreateDocument = void 0;
const docBase64_1 = require("../docBase64");
exports.bodyCreateDocument = {
    document: {
        path: '/TES0.0.0.0.0...pdf',
        content_base64: docBase64_1.docBase64,
        deadline_at: '2023-05-07T14:20:49-05:00',
        auto_close: true,
        locale: 'pt-BR',
        sequence_enabled: false,
        block_after_refusal: true,
    }
};
exports.bodyCreateSigner = {
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
};
exports.bodyNotifySigner = {
    request_signature_key: '577f57a0-4c5c-459f-ace4-416621d5ba5a'
};
