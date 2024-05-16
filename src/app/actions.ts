"use server"

import path from "path"
import fs from "fs"
import { headers } from 'next/headers'
// import { fileTypeFromBuffer } from 'file-type';



export const saveToReduxStore = async (data: Record<string, string | number>) => {
  try {
    const id = `user-agent=[${headers().get("user-agent")}], ip=[${headers().get("x-forwarded-for")}]`
    const database_dir = path.join(process.cwd(), "dummy_redux_store.json")
    let foundDB = false;
    if (fs.existsSync(database_dir)) {
      foundDB = true
    }
    const storedData = (foundDB && JSON.parse(fs.readFileSync(database_dir))) || {}
    Object.assign(storedData, { [id]: { data } })
    fs.writeFileSync(database_dir, JSON.stringify(storedData, null, 2))
    return { status: "success" }
  }
  catch (e) {
    console.log(e)
    return { status: "error" }
  }
}


/*
export const submit = async function (formData: FormData) {
  console.log("\n======== Server-Action ========\n")
  const successfullySavedFiles = []
  const alreadyExistedFiles = []
  let unableToSaveFiles = 0
  try {
    console.log(Object.fromEntries(formData))
    const username = formData.get("username")
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
    const savedFileArrayPromise = []
    let index = 0;
    while (true) {
      let file = formData.get(`file_${index}`)
      if (!file) break;
      savedFileArrayPromise.push(saveFile(file))
      index++
    }
    (await Promise.allSettled(savedFileArrayPromise)).forEach(x => {
      if (x.status === "rejected" && x.reason.message !== "already existed") {
        unableToSaveFiles++
      }
    })
    return {
      message: "Submited",
      type: "server-action",
      username,
      totalSubmitedFiles: index,
      successfullySavedFiles,
      alreadyExistedFiles,
      unableToSaveFiles
    }
  }
  catch (e) {
    console.log(e)
    return {
      error: true,
      type: "server-action",
      message: e.message,
      successfullySavedFiles,
      alreadyExistedFiles,
      unableToSaveFiles
    }
  }
}
*/