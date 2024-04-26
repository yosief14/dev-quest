import Header from "@/components/Header"
import SignOutButton from "@/components/SignOut"
import AddJobForm from "./AddJobForm"

export default function AddJob() {

    return (
        <>
            <Header />
            <main className={`flex flex-col justify-center items-center  bg-dev-grey-blue h-full min-h-fit`}>
                <div className="relative top-24 sm:top-0 gap-20 flex bg-white rounded-lg border-opacity-40 shadow-xl p-7 flex-col items-center">
                    <h1 className={`text-3xl font-bold text-center`}>Add a Job</h1>
                    <AddJobForm></AddJobForm>
                    <SignOutButton></SignOutButton>
                </div>
            </main>
        </>
    )
}
