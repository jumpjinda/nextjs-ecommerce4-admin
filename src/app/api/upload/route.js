import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

async function uploadImageToS3(file, fileName) {
  const resizedImageBuffer = await sharp(file)
    .resize(400, 400) // Specify your desired width or height for resizing
    .toBuffer();

  const params = {
    Bucket: "nextjs-ecommerce4",
    Key: `${Date.now()}-${fileName}`,
    Body: resizedImageBuffer,
    ContentType: "image/jpeg", // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadImageToS3(
      buffer,
      uuid() + "." + fileExtension
    );

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
