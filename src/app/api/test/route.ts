
import { type NextRequest, NextResponse } from "next/server"
import { fileTypeFromBuffer } from 'file-type';
import path from "path"
import fs from "fs"


/*
export const config = {
  api: {
    bodyParser: false
  }
}
*/
export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  console.log("\n======== Route Handler ========\n")
  const formData = await req.formData()
  const successfullySavedFiles = []
  const alreadyExistedFiles = []
  let unableToSaveFiles = 0
  try {
    console.log(Object.fromEntries(formData))
    const saveFile = async function (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const trustedFileType = await fileTypeFromBuffer(buffer)
      const dir = path.join("/sdcard", "uploads", trustedFileType.ext)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      let fileName = path.join(dir, file.name)
      if (!fileName.endsWith("." + trustedFileType.ext)) {
        fileName = fileName + "." + trustedFileType.ext
      }
      if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, buffer)
        successfullySavedFiles.push(fileName)
        return fileName
      } else {
        alreadyExistedFiles.push(fileName)
        throw { message: "already existed" }
      }
    }
    const totalSubmitedFilesArrayPromise = []
    while (true) {
      let file = formData.get(`file_${totalSubmitedFilesArrayPromise.length}`)
      if (!file) break;
      totalSubmitedFilesArrayPromise.push(saveFile(file))
    }
    if (totalSubmitedFilesArrayPromise.length === 0) {
      throw { message: "No file found" }
    }
    (await Promise.allSettled(totalSubmitedFilesArrayPromise)).forEach(x => {
      if (x.status === "rejected" && x.reason.message !== "already existed") {
        unableToSaveFiles++
      }
    })
    return NextResponse.json({
      message: "Submited",
      type: "router handler",
      totalSubmitedFiles: totalSubmitedFilesArrayPromise.length,
      successfullySavedFiles,
      alreadyExistedFiles,
      unableToSaveFiles
    })
  }
  catch (e) {
    console.log(e)
    return NextResponse.json({
      error: true,
      type: "router handler",
      message: e.message,
      successfullySavedFiles,
      alreadyExistedFiles,
      unableToSaveFiles
    })
  }
}