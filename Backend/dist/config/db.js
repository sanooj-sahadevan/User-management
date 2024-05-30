"use strict";
// import { Client } from 'pg';
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
exports.client = void 0;
// const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'usermanagement',
//     user: 'postgres',
//     password: 'Babygirl@123'
// });
// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to the database');
//     } catch (err) {
//         console.error('Connection error:');
//     }
// }
// connectToDatabase();
// export default client;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'usermanagement',
    user: 'postgres',
    password: 'Babygirl@123'
});
exports.default = () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.client.connect(); });
