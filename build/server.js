"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const index_1 = __importDefault(require("./index"));
const constants_1 = require("./utils/constants");
index_1.default.listen(constants_1.PORT, () => {
    console.log(`
- API REST E-COMMERCE TP-TS-EXPRESS
*************************************
- Version: 1.0.0
- Author: MOUYAHADA Ismail
- Postman : https://www.getpostman.com/
- URL de base :  http://localhost:${constants_1.PORT}
  `);
});
