
import Test from "@/components/Test"





export const dynamic = "force-dynamic"

export default async()=>{
  return (
    <Test/>
  )
}



/*
import Form from "@/components/Form"
import { headers, cookies } from "next/headers"


export default async function () {
   const submit = async (formData: FormData) => {
     "use server"
     console.log(formData)
     console.log("Server Component")
     return {
       value: formData.get("username")
     }
   }
  let _headers = Object.fromEntries(headers())
  let _cookies = Object.fromEntries(cookies())
  console.log(_headers, _cookies)
  return (<>
    <Form/>
  </>)
}*/