import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAla0q_ymRzNcbXqHRuTbHoY6OeO4GxiVI",
  authDomain: "shopone-18db1.firebaseapp.com",
  projectId: "shopone-18db1",
  storageBucket: "shopone-18db1.appspot.com",
  messagingSenderId: "1095758901024",
  appId: "1:1095758901024:web:f785bcdf0bce9cbac57145",
  measurementId: "G-WNE5H0M6CG"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage()
const auth = getAuth()

export const getProduct = async (query: string) => {
  const res = await getDocs(collection(db, query))
  if (res) {
    const dataArray = <any>[]
    res.forEach(doc => {
      const id = doc.id
      const obj = { id, ...doc.data() }
      dataArray.push(obj)
    })
    return dataArray
  }
}
export const addProduct = async (product: any) => {
  const nowTime = new Date()
  const year = nowTime.getFullYear().toString()
  let month: number | string = nowTime.getMonth() + 1
  month = month.toString()
  if (month.length <= 2) {
    month = '0' + month
  }
  const day = nowTime.getDate().toString()
  product.created = year + month + day
  const collectionRef = collection(db, 'products')
  try {
    const newProductRef = await addDoc(collectionRef, product)
    if (newProductRef) {
      return 'success'
    }
  }
  catch (error) { console.error(error) }
}
export const getPaths = async () => {
  const res = await getDocs(collection(db, 'paths'))
  if (res) {
    const id = res.docs[0].id
    const resList = res.docs[0].data()
    if (Array.isArray((resList.list))) {
      return {
        id: id,
        list: resList.list
      }
    }
  }
}
export const setPaths = async (id: string, list: string[]) => {
  const docRef = doc(db, 'paths', id)
  const newData = { list }
  setDoc(docRef, newData)
}
export const upLoadImages = async (file: File) => {
  const imagesRef = ref(storage, 'images/' + file.name)
  const res = await uploadBytes(imagesRef, file)
  try {
    if (res) {
      const imgUrl = await getDownloadURL(ref(storage, 'images/' + file.name))
      return imgUrl
    }
  }
  catch (err) { console.log(err) }
}
export const registerUser = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (res) {
      const userId = res.user.uid
      return { userId: userId }
    }
  }
  catch (err) { console.error(err) }
}
export const loginUser = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (res) {
      const userId = res.user.uid
      return { userId: userId }
    }
  }
  catch (err) {
    console.error(err)
    return undefined
  }
}
export const userSignOut = async () => {
  try { signOut(auth) }
  catch (err) {
    console.log(err)
  }
}
export const checkToken = (expirationTime: string) => { //這裡的 check 單純是在確認 localStore 中的 item 有無過期
  const nowTime = new Date().getDate()
  if (nowTime > JSON.parse(expirationTime)) {
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return
  }
  const id = localStorage.getItem('userId')
  if (id) {
    return id
  }

}