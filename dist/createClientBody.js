"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientBody = void 0;
const axios_1 = require("axios");
const clientBody = () => new axios_1.Axios({
    baseURL: 'https://sandbox.clicksign.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    transformRequest: (data) => JSON.stringify(data),
    transformResponse: (data) => {
        try {
            return JSON.parse(data);
        }
        catch (err) {
            return err;
        }
    }
});
exports.clientBody = clientBody;
