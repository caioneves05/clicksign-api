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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickSign = void 0;
const querystring_1 = __importDefault(require("querystring"));
const createClientBody_1 = require("./createClientBody");
const keyValidation_1 = require("./keyValidation");
class ClickSign {
    constructor(client, key) {
        this.errorResponse = (response) => {
            if (response.data.errors) {
                console.error(response.data.errors);
                throw new Error();
            }
        };
        if (!key) {
            throw new Error('Parameter token is not set.');
        }
        this.client = client;
        this.key = key;
    }
    createDocument(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client, key } = this;
            const config = querystring_1.default.stringify({ access_token: key });
            const result = yield client.post(`/api/v1/documents?${config}`, request);
            this.errorResponse(result);
            return yield result.data;
        });
    }
    createSigner(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client, key } = this;
            const config = querystring_1.default.stringify({ access_token: key });
            const result = yield client.post(`/api/v1/signers?${config}`, request);
            return yield result.data;
        });
    }
    AddSignToDocument(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client, key } = this;
            const config = querystring_1.default.stringify({ access_token: key });
            const result = yield client.post(`/api/v1/lists?${config}`, request);
            return yield result.data;
        });
    }
    notifyingSignatorySMS(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client, key } = this;
            const config = querystring_1.default.stringify({ access_token: key });
            const notification = yield client.post(`/api/v1/notify_by_sms?${config}`, request);
            return yield notification.data;
        });
    }
}
exports.ClickSign = ClickSign;
const body = {
    request_signature_key: '577f57a0-4c5c-459f-ace4-416621d5ba5a'
};
function execute() {
    new ClickSign((0, createClientBody_1.clientBody)(), (0, keyValidation_1.validationKeyEnviroment)())
        .notifyingSignatorySMS(body)
        .then((result) => {
        console.log('Resultado da notificação SMS:', result);
        // Aqui dentro você pode trabalhar com o resultado retornado pela promise
    })
        .catch((error) => {
        console.error('Ocorreu um erro:', error);
        // Aqui dentro você pode tratar o erro caso a promise seja rejeitada
    });
}
execute();
