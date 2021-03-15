const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: process.env.ENDPOINT,
  port: Number(process.env.MINIOPORT),
  useSSL: false,
  accessKey: process.env.MINIOACCESSKEY,
  secretKey: process.env.MINIOSECRETKEY,
});

module.exports = minioClient;
