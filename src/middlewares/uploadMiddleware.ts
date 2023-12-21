import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, './src/uploads'); // Destination folder for uploaded files
    },
    filename: (req: any, file: { fieldname: string; originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

export const upload = multer({ storage: storage });
