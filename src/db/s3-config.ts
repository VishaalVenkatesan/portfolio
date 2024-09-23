"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { cookies } from 'next/headers'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL() {
  if (!cookies().has('auth')) {
    return { failure: 'No auth token found' }
  }

  try {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      ContentType: 'image/*'  
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 });

    return { success: { url: signedUrl } }
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return { failure: 'Failed to generate signed URL' }
  }
}