
import { Metadata } from "next"
import ReduxProvider from "@/components/ReduxProvider"
import Script from "next/script"
import { cookies } from 'next/headers'
import "@/styles/global.css"


export const metadata: Metadata = {
  title: "Testing Redux"
}


const fetchData = async () => {
  try {
    const storedData = JSON.parse(cookies().get("redux-state")?.value)
    if (Object.keys(storedData).length === 0) {
      throw { message: "incomplete records" }
    }
    return storedData
  }
  catch (e) {
    console.log(e.message)
    return null
  }
}


export default async function ({ children }) {
  const data = await fetchData()
  return (
    <html lang="en">
      <body>
        <ReduxProvider
          initialStoreState={data}
        >
          {children}
        </ReduxProvider>
        <Script
          src="/static/eruda.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}