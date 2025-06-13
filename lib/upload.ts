import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderName = formData.get("clebutPublicImage") as string;

    if (!file) {
      return NextResponse.json({
        msg: "File not found",
        statusCode: 404,
      });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Return the secure_url and public_id
    return NextResponse.json({
      msg: "File uploaded to cloudinary",
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      statusCode: 200,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error in fileupload route",
      error: error instanceof Error ? error.message : error,
      statusCode: 500,
    });
  }
}