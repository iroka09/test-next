
import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import random from "random"
import fs from "fs"
import { fileTypeFromBuffer } from 'file-type';





export async function GET(req: NextRequest) {
  try {
    const urlObj = new URL(req.url)
    const hasDownload = urlObj.searchParams.has("download")
    const dir1 = path.join("/sdcard", "Xender", "image")
    const dir2 = path.join("/sdcard", "Pictures", "facebook")
    const dir3 = path.join("/sdcard", "WhatsApp", "Media", "WhatsApp Images")
    const filterDir = dir => (
      fs.readdirSync(dir)
        .filter(x => /.+\.(jpg|png|svg)$/i.test(x))
        .map(x => path.join(dir, x))
    )
    const imageDirs = filterDir(dir1).concat(filterDir(dir2), filterDir(dir3))
    const choosenImageDir = random.choice(imageDirs)
    if (!choosenImageDir)
      throw { message: "no image in imageDirs" }
    const readStream = async (stream) => {
      const chunks = []
      let totalChunksBytes = 0
      const minimumRequiredChunksBytes = (2 ** 10) * 5 //5KB
      for await (const chunk of stream) {
        chunks.push(chunk)
        totalChunksBytes += chunk.length
        if (totalChunksBytes >= minimumRequiredChunksBytes) break
      }
      return Buffer.concat(chunks)
    }
    const buffer = await readStream(fs.createReadStream(choosenImageDir))
    const trustedImageMeta = await fileTypeFromBuffer(buffer)
    // console.log(trustedImageMeta)
    if (!("ext" in trustedImageMeta))
      throw { message: "bad trustedImageMeta" };
    if (!(/^(jpg|jpeg|png|svg)$/i.test(trustedImageMeta.ext))) {
      throw { message: choosenImageDir + " is not image" }
    }
    const stream = fs.createReadStream(choosenImageDir)
    return new NextResponse(stream, {
      headers: {
        "Content-Type": trustedImageMeta.mime,
        "Cache-Control": "private, max-age=" + 30,
        // "Cache-Control": "public, must-revalidate",
        // "Cache-Control": "no-cache",
        ...(hasDownload ? {
          "Content-Disposition": `attachment; filename=${choosenImageDir.match(/[^\/\\]+$/).toString()}`
        } : {})
      },
      status: 200
    })
  }
  catch (e) {
    console.log(e.message)
    return new NextResponse(e.message)
  }
}