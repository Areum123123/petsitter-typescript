import "dotenv/config";

const PORT_NUMBER: number = process.env.PORT_NUMBER
  ? Number(process.env.PORT_NUMBER)
  : 3000;
const ACCESS_TOKEN_SECRET_KEY =
  process.env.ACCESS_TOKEN_SECRET_KEY || "default-access-token-secret";
const REFRESH_TOKEN_SECRET_KEY =
  process.env.REFRESH_TOKEN_SECRET_KEY || "default-refresh-token-secret";

export { PORT_NUMBER, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY };

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;
export const AWS_REGION = process.env.AWS_REGION as string;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
export const AWS_SECRET_ACCESS_KEY = process.env
  .AWS_SECRET_ACCESS_KEY as string;
