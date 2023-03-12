"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationKeyEnviroment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validationKeyEnviroment = () => {
    const token = '2febcb09-c5df-46fd-875d-8818eb4ed1a6';
    if (token) {
        return token;
    }
    else {
        throw new Error('ACESS_TOKEN is not defined!');
    }
};
exports.validationKeyEnviroment = validationKeyEnviroment;
