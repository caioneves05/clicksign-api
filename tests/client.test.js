"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../src/client");
const createClientBody_1 = require("../src/createClientBody");
const keyValidation_1 = require("../src/keyValidation");
const docBase64_1 = require("../src/docBase64");
const bodyMethods_1 = require("../src/types/bodyMethods");
describe('Client', () => {
    let client;
    beforeEach(() => {
        client = new client_1.ClickSign((0, createClientBody_1.clientBody)(), (0, keyValidation_1.validationKeyEnviroment)());
    });
    jest.setTimeout(50000);
    it('should crete a new document', () => __awaiter(void 0, void 0, void 0, function* () {
        const deadline_at = new Date();
        deadline_at.setDate(deadline_at.getDate() + 1);
        const body = {
            document: {
                path: '/testeDocument.pdf',
                deadline_at: deadline_at.toISOString(),
                content_base64: docBase64_1.docBase64,
                auto_close: true,
                locale: 'pt-BR',
                sequence_enabled: false,
                block_after_refusal: true
            }
        };
        const newDocument = yield client.createDocument(body);
        expect(newDocument).toEqual(expect.objectContaining({
            document: expect.objectContaining({
                path: body.document.path,
                locale: 'pt-BR'
            })
        }));
    }));
    it('should create a new signer', () => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        const newSginer = yield client.createSigner(body);
        expect(newSginer).toEqual(expect.objectContaining({
            signer: expect.objectContaining({
                email: body.signer.email,
                auths: expect.arrayContaining(body.signer.auths)
            })
        }));
    }));
    it('should add a signer to the document.', () => __awaiter(void 0, void 0, void 0, function* () {
        const createDocument = yield client.createDocument(bodyMethods_1.bodyCreateDocument);
    }));
});
