import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Helmet } from "react-helmet-async";


const Login = () => {

    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();


    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    const signInWithGitHub = async () => {
        await signInWithPopup(auth, gitHubProvider)
    }

    return (
        <main className="h-screen bg-yellow-300 pt-10">
            <Helmet>
                <title>Short Diary | Login</title>
            </Helmet>
            <div className="container mx-auto">
                <div className="bg-white shadow-md rounded-md py-12">
                    <p className="mb-5 text-center">好きなアカウントでのログインを行なってください</p>
                    <div className="flex gap-3 flex-col items-center">
                        <button className="bg-white w-max border border-black py-2 px-4 rounded flex items-center gap-2 cursor-pointer" onClick={signInWithGoogle}>
                            <div>
                                <img src="/google-icon.svg" alt="" className="h-7 w-7"/>
                            </div>
                            <p>Googleでログイン</p>
                        </button>
                        <button className="bg-white text-black w-max border border-black py-2 px-4 rounded flex items-center gap-2 cursor-pointer" onClick={signInWithGitHub}>
                            <div>
                                <img src="/github-icon.svg" alt="" className="h-7 w-7"/>
                            </div>
                            <p>GitHubでログイン</p>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login