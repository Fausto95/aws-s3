import { IConfig } from "./types";

export const throwError = (config: IConfig, file: File) => {
  if (config.bucketName === null || config.bucketName === "") {
    throw new Error(`Your bucketName cannot be empty `);
  }
  if (config.region === null || config.region === "") {
    throw new Error(`Must provide a valide region in order to use your bucket`);
  }
  if (config.accessKeyId === null || config.accessKeyId === "") {
    throw new Error(`Must provide accessKeyId`);
  }
  if (config.secretAccessKey === null || config.secretAccessKey === "") {
    throw new Error(`Must provide secretAccessKey`);
  }
  if (!file) {
    throw new Error(`File cannot be empty`);
  }
};
