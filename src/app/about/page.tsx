"use client"

import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeName, changeAge } from "@/components/redux/userSlice"
import { DispatchType, RootStateType } from "@/components/redux/store"
import Link from "next/link"




export const dynamic = "force-dynamic"




export default function () {
  const nameRef = useRef()
  const ageRef = useRef()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleApply = () => {
    let name = nameRef.current?.value || "none"
    let age = ageRef.current?.value || "none"
    dispatch(changeName(name))
    dispatch(changeAge(age))
  }
  return (<>
    <div>
      <Link
        href="/"
      >
        Home page
      </Link>
      <br />
      <br />
      <input ref={nameRef} placeholder="name" defaultValue="Iroka" />
      <br />
      <input ref={ageRef} placeholder="age" defaultValue="28" />
      <br />
      <button onClick={handleApply}>
        Apply
      </button>
      <br />
      <br />
      <div>
        <h2>Name: {user.name}</h2>
        <h2>Age: {user.age}</h2>
      </div>
    </div>
  </>)
}