import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  S3_BUCKET_NAME,
} from "../constant/env.constant";

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: S3_BUCKET_NAME,
    metadata: (
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error: any, metadata?: any) => void
    ) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error: any, key?: string) => void
    ) => {
      cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

export default upload;
