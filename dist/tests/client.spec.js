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
const client_1 = require("../client");
const createClientBody_1 = require("../createClientBody");
const keyValidation_1 = require("../keyValidation");
const docBase64_1 = require("../docBase64");
describe('Client', () => {
    const client = new client_1.ClickSign((0, createClientBody_1.clientBody)(), (0, keyValidation_1.validationKeyEnviroment)());
    it('should crete a new document', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            document: {
                path: '/testeDocument.pdf',
                content_base64: docBase64_1.docBase64,
                deadline_at: '2023-05-06T14:30:59-03:00',
                auto_close: true,
                locale: 'pt-BR',
                sequence_enabled: false,
                block_after_refusal: true
            }
        };
        const { newDocument } = yield client.createDocument(body);
        expect(newDocument).toEqual(expect.objectContaining({
            document: expect.objectContaining({
                path: body.document.path,
                filename: 'testeDocument.pdf'
            })
        }));
    }));
});
