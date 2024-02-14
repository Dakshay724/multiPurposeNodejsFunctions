import { v2 } from "cloudinary";

v2.config({
  cloud_name: "dqsr2bc7g",
  api_key: "786424973871216",
  api_secret: "H0WyegMYFFyHhoM4Xv3smj2UkR4",
});

const fs = require("fs");
const path = require("path");

// Directory path containing the files you want to upload
const directoryPath = "../../../../../../RizzTix/mobile/Static-Images";

// Options for the upload, including the folder
const uploadOptions = {
  folder: "RizzTix/mobile/Static-Images",
  tags: ["tag1", "tag2"],
  use_filename: true,
  unique_filename: false,
};

async function uploadBatch(filePaths: any) {
  const uploadPromises = filePaths.map((filePath: any) => {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(filePath, uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });

  try {
    const uploadResults = await Promise.all(uploadPromises);
    console.log("Upload results:", uploadResults);
  } catch (error) {
    console.error("Upload error:", error);
  }
}

// Function to upload files in batches
async function uploadFilesInBatches(directoryPath: any, batchSize: any) {
  fs.readdir(directoryPath, async (err: any, files: any) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    let batch = [];
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(directoryPath, files[i]);
      batch.push(filePath);

      if (batch.length === batchSize || i === files.length - 1) {
        await uploadBatch(batch);
        batch = [];
      }
    }
  });
}

// Call the function to upload files in batches
uploadFilesInBatches(directoryPath, 10);
