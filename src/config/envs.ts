import dotenv from 'dotenv';
dotenv.config();

const envList: {[key: string]: string} = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '5050',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'test',
  privateKey:
    process.env.PRIVATE_KEY ||
    '{"crv":"P-256","kty":"EC","x":"xsRKtq5TKwJCzwiM5U73dJttfjUwaTx5i64Lp_CEIiw","y":"Q_Qh89Ll8ZKDCRCNRH07Qz7T-tHS5aU3Bzt2bQ6lFNo","d":"UVuGBOhLSqfX2l448vOQi-Lskp8NDull5zeVO1kJjo0"}',
};

export function getEnv(envType: string) {
  return envList[envType];
}

export default getEnv;
