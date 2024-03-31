import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../lib/firebase";
import { ChangeEvent, FormEvent, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";

const Create = () => {

    const [user] = useAuthState(auth)

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>("/no-image.png")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const submitDiary = async (e: FormEvent) => {
        e.preventDefault()
        if (title && content) {

            toast.loading('送信中...')
            setIsLoading(true)

            let url: string = ""

            if (file) {
                const storageRef = ref(storage, `images/${file?.name}`);

                await uploadBytes(storageRef, file).then(() => {
                    console.log('Uploaded a blob or file!');
                })

                url = await getDownloadURL(storageRef)

            } else {
                url = "https://firebasestorage.googleapis.com/v0/b/short-diary-dcb73.appspot.com/o/images%2Fno-image.png?alt=media&token=72bbbd57-1d38-40ea-9f5d-4c519023b464"
            }

            await addDoc(collection(db, "diaries"), {
                thumbnail: url,
                title: title,
                content: content,
                createdAt: serverTimestamp(),
                userName: user?.displayName,
                userIcon: user?.photoURL
            });

            toast.dismiss()
            toast.success('投稿成功😀')
            setTitle("")
            setContent("")
            setPreview("/no-image.png")
            setIsLoading(false)

        } else {
            alert("入力されていない箇所があります。")
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <main className="bg-yellow-300">
            <Toaster />
            <Helmet>
                <title>Short Diary | Create</title>
            </Helmet>
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    <div className="col-start-3  col-span-8 bg-white my-12 p-4 rounded">
                        <form onSubmit={submitDiary}>
                            <h2 className="text-3xl font-bold mb-5">記事を書く✏️</h2>
                            <div className="mb-10">
                                <h3 className="text-2xl mb-2">サムネを選ぶ</h3>
                                <div>
                                    <div>
                                        <img src={preview} alt="" onClick={() => document.getElementById('file-input')?.click()} className="cursor-pointer" />
                                    </div>
                                    <input type="file" id="file-input" className="hidden" onChange={handleImageChange} disabled={isLoading}/>
                                </div>
                            </div>
                            <div className="mb-10">
                                <h3 className="text-2xl mb-2">タイトル</h3>
                                <input type="text" className="border border-black w-full p-2 rounded" placeholder="5文字以内でお願いします。" onChange={(e) => setTitle(e.target.value)} value={title} disabled={isLoading}/>
                            </div>
                            <div className="mb-10">
                                <h3 className="text-2xl mb-2">内容を書く</h3>
                                <textarea className="border border-black w-full p-2 rounded resize-none h-[200px]" placeholder="30文字以内でお願いします。" onChange={(e) => setContent(e.target.value)} value={content} disabled={isLoading}></textarea>
                            </div>
                            <button className="bg-blue-700 text-white py-2 px-7 rounded" disabled={isLoading}>投稿</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Create