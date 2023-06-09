/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

const AccountMenu = ({visible, username, photoUrl}) => {
    const navigate = useNavigate()

    if(!visible) {
        return null
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full" onClick={() => navigate('/profiles')} >
                    <img
                        className="w-8 rounded-md"
                        src={photoUrl}
                        alt="Profile Pic"
                    />
                    <p className="text-white text-sm group-hover/item:underline">
                        {username}
                    </p>
                </div>
            </div>
            <hr className="bg-gray-600 border-0 h-px my-4" />
            <div
                onClick={() => signOut(firebaseAuth)}
                className="px-3 text-center text-white text-sm hover:underline"
            >
                Sign out of MoviScreen
            </div>
        </div>
    )
}

export default AccountMenu
