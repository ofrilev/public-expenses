import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { join } from "path";
const bucketName = process.env.aws_scrape_bucket_name || "";
const userName = process.env.user_name || "";
const userDirPath = `${userName}-scrape_dir`;

const s3 = new S3Client({
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.aws_access_key || "",
    secretAccessKey: process.env.aws_secret_key || "",
  },
});

export const init = async () => {
  try {
    const data = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );
    console.log("suceed retriving data from s3.send ");
    const directoryExists = data.Contents?.some(
      (prefix) => prefix.Key === userDirPath
    );

    if (!directoryExists) {
      console.log("Directory does not exist, creating directory...");
      await s3.send(
        new PutObjectCommand({ Bucket: bucketName, Key: userDirPath })
      );
      console.log("Directory created successfully");
    } else {
      console.log("Directory exists");
    }
  } catch (err) {
    console.log("Error", err);
  }
};

export const uploadFileToUserPath = async (
  filePath: string,
  fileName: string
) => {
  const fullBucketPath = join(userDirPath, fileName);
  const fileContent = readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: fullBucketPath,
    Body: fileContent,
    ContentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    if (data.$metadata.httpStatusCode == 200) {
      console.log(`success with uploading:${fullBucketPath} to s3 `);
    } else {
      console.log(
        `failed to upload:${filePath} to s3 with status code: ${data.$metadata.httpStatusCode}`
      );
    }
  } catch (err: any) {
    console.log(err, err.stack);
  }
};
