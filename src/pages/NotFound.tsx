import { Helmet } from "react-helmet-async"

const NotFound = () => {
    
    return (
        <main className="bg-yellow-300 h-screen">
            <Helmet>
                <title>Short Diary | 404</title>
            </Helmet>
            <div className="container mx-auto ">
                <div className="text-center">
                    <h3 className="text-[100px] font-weight">404</h3>
                    <p className="text-2xl">Not Found</p>
                </div>
            </div>
        </main>
    )
}

export default NotFound