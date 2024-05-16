
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import Cookies from "js-cookie"

const loadInitialState = () => {
  alert("loadInitialState")
}

const testMiddleware = (store) => (next) => (action) => {
  console.log("testMiddleware")
  return next(action)
}

export const makeStore = () => (
  configureStore({
    reducer: {
      user: userReducer
    }
  })
)
const store = configureStore({
  reducer: {
    user: userReducer
  },
  ...(globalThis.document && {
    preloadedState: loadInitialState(),
    middleware: (defaultOnes) => {
      return defaultOnes().concat(testMiddleware)
    }
  })
})

store.subscribe(async () => {
  try {
    if (window.hydrated !== true) return
    const result = Cookies.set("redux-state", JSON.stringify(store.getState()), {
      path: "/",
      sameSite: "strict",
      secure: false,
      expires: 1, //1day
    })
    console.log("store.subscribe(): ", Cookies.get())
  } catch (e) {
    console.warn("store.subscribe(): ", e)
  }
})


export default store

type StoreType = typeof store
export type RootStateType = ReturnType<StoreType["getState"]>
export type DispatchType = StoreType["dispatch"]