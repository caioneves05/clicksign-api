"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (response) => {
    if (response.data.errors) {
        console.error(response.data.errors);
        throw new Error;
    }
};
exports.errorResponse = errorResponse;
