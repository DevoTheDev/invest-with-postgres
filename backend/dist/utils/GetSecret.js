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
exports.getSecret = getSecret;
const data_source_1 = require("../data-source");
const Secret_1 = require("../entities/Secret");
const logger_1 = require("./logger");
const secretCache = new Map();
function getSecret(keyName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (secretCache.has(keyName)) {
            (0, logger_1.logMessage)('info', `Using cached secret for ${keyName}`);
            return secretCache.get(keyName);
        }
        try {
            if (!data_source_1.AppDataSource.isInitialized) {
                yield data_source_1.AppDataSource.initialize();
                (0, logger_1.logMessage)('info', 'Initialized AppDataSource for secret retrieval');
            }
            const secretRepository = data_source_1.AppDataSource.getRepository(Secret_1.Secret);
            const secret = yield secretRepository.findOne({
                where: { key_name: keyName }
            });
            if (!secret || !secret.key_value) {
                (0, logger_1.logMessage)('error', `Secret '${keyName}' not found in secrets table`);
                throw new Error(`Secret '${keyName}' not found in database. Please add it to the secrets table.`);
            }
            secretCache.set(keyName, secret.key_value);
            (0, logger_1.logMessage)('info', `Successfully fetched and cached secret for ${keyName}`);
            return secret.key_value;
        }
        catch (error) {
            (0, logger_1.logMessage)('error', `Failed to fetch secret '${keyName}': ${error.message}`);
            throw new Error(`Failed to fetch secret '${keyName}': ${error.message}`);
        }
    });
}
