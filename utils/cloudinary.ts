import { v2 as cloudinary } from "cloudinary"

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

/**
 * Uploads a local file path or remote URL to Cloudinary, converting it to WebP.
 * Returns the secure HTTPS URL of the uploaded asset.
 * Only call from server-side code (API routes, server actions, scripts).
 */
export async function uploadImageAsWebP(
  source: string,
  publicId: string,
): Promise<string> {
  configure()
  const result = await cloudinary.uploader.upload(source, {
    folder: "tour-guide",
    public_id: publicId,
    format: "webp",
    quality: "auto",
    overwrite: true,
  })
  return result.secure_url
}

/**
 * Uploads a Buffer to Cloudinary as WebP.
 * Use this for file uploads from admin form (multipart/form-data).
 */
export async function uploadBufferAsWebP(
  buffer: Buffer,
  publicId: string,
): Promise<string> {
  configure()
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "tour-guide",
        public_id: publicId,
        format: "webp",
        quality: "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result.secure_url)
      },
    )
    stream.end(buffer)
  })
}
