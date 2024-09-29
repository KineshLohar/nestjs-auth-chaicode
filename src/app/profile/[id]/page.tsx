


export default function UserProfile({params}: any){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="text-lg">Welcome to your user profile page {params.id}</p>
        </div>
    )
}