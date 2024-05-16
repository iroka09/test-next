"use client"

import { useState, useEffect } from "react"
import { Provider } from "react-redux"
import store, { makeStore } from "@/components/redux/store"
import { changeName, changeAge } from "@/components/redux/userSlice"
import { usePathname } from "next/navigation"




console.log("outside component=" + Math.random())



export default function ({ initialStoreState: state, children }) {
  const mainStore = (() => {
    if (!globalThis.document) {
      const _store = makeStore()
      if (state?.user) {
        _store.dispatch(changeName(state.user.name))
        _store.dispatch(changeAge(state.user.age))
      }
      return _store
    }
    if (!globalThis.hydrated && state?.user) {
      store.dispatch(changeName(state.user.name))
      store.dispatch(changeAge(state.user.age))
    }
    return store
  })()
  const pathname = usePathname()
  useEffect(() => {
    window.hydrated = true
    window.eruda?.init()
  }, [])
  return (
    <Provider store={mainStore}>
      <h1>{pathname}</h1>
      {children}
    </Provider>
  )
}