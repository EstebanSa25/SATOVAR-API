"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const domain_1 = require("../../domain");
class FileUploadService {
    constructor() { }
    checkFolder(folderPath) {
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
    }
    async uploadSingle(file, folder = 'uploads', validExtensions = ['png', 'gif', 'jpg', 'jpeg']) {
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            if (!validExtensions.includes(fileExtension)) {
                throw domain_1.CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`);
            }
            const destination = path_1.default.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);
            // const fileName = `${this.uuid()}.${fileExtension}`;
            // file.mv(`${destination}/${fileName}`);
            // return { fileName };
        }
        catch (error) {
            // console.log({error});
            throw error;
        }
    }
    async uploadMultiple(files, folder = 'uploads', validExtensions = ['png', 'jpg', 'jpeg', 'gif']) {
        const fileNames = await Promise.all(files.map((file) => this.uploadSingle(file, folder, validExtensions)));
        return fileNames;
    }
}
exports.FileUploadService = FileUploadService;
