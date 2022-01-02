"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonTypeById = exports.getPokemonById = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'https://pokeapi.co/api/v2';
function getPokemonById(id) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .get(`${API_URL}/pokemon/${id}`)
            .then((resp) => {
            resolve(resp.data);
        })
            .catch(reject);
    });
}
exports.getPokemonById = getPokemonById;
function getPokemonTypeById(id) {
    return new Promise((resolve, reject) => {
        axios_1.default
            .get(`${API_URL}/type/${id}`)
            .then((resp) => {
            resolve(resp.data);
        })
            .catch(reject);
    });
}
exports.getPokemonTypeById = getPokemonTypeById;
exports.default = { getPokemonById, getPokemonTypeById };
