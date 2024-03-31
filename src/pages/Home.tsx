import { DocumentData, collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../lib/firebase";
import { Helmet } from "react-helmet-async";

const Home = () => {

    const [allDiaries, setAllDiaries] = useState<DocumentData[]>([])

    const getAllDiaries = async () => {
        const querySnapshot = await getDocs(query(collection(db, "diaries"), orderBy("createdAt", "desc")));
        const allDiaries = querySnapshot.docs.map((doc) => {
            return doc.data()
        });

        setAllDiaries(allDiaries)
        console.log(allDiaries)
    }

    useEffect(() => {
        getAllDiaries();
    }, [])

    return (
        <main className="bg-yellow-300 h-screen">
            <Helmet>
                <title>Short Diary | Home</title>
            </Helmet>
            <div className="container mx-auto px-4">
                <div className="py-20">
                    <div className="text-center mb-[120px]">
                        <h2 className="lg:text-[70px] text-[50px] text-center mb-5">みんなの日記</h2>
                        <button className="rounded py-2 px-5 border border-black bg-white"><Link to="/create">日記を書く✏️</Link></button>
                    </div>
                    <ul className="grid lg:grid-cols-8 md:grid-cols-4 gap-10">
                        {allDiaries && allDiaries.map((diary, index) => (
                            <li className="col-span-2 bg-white p-2 rounded relative" key={index}>
                                <div className="bg-blue-500 py-1 px-6 gap-2 flex justify-center items-center w-max absolute top-0 left-[50%] translate-x-[-50%] rounded-b">
                                    <div>
                                        <img src={diary.userIcon} alt="" className="w-6 h-6 rounded-full" />
                                    </div>
                                    <div>
                                        <p className="text-white">{diary.userName}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={diary.thumbnail} alt="" className="w-full h-[180px] object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-[10px]">{diary.createdAt.toDate().toLocaleString()}</h3>
                                    <p>{diary.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Home