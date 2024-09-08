import { del, get, set } from 'idb-keyval'

export const setIndexedDBItem = (key: string, value: any) => {
  set(key, value).then().catch()
}

export const getIndexedDBItem = (key: string) => {
  get(key).then().catch()
}

export const removeIndexedDBItem = (key: string) => {
  del(key).then().catch()
}
