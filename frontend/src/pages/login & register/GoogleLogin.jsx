import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGoogleLoginMutation } from '../../store/features/auth/authAPI';
const GoogleLogin = () => {
    const navigate = useNavigate()

    const [googleLogin, { isLoading }] = useGoogleLoginMutation()

    const handleLogin = async () => {
        const googleResponse = await signInWithPopup(auth, provider)
        //  console.log("googleResponse",googleResponse)
        const user = googleResponse.user
        const data = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
        }
        //  console.log(data,"---")
        try {
            const res = await googleLogin(data).unwrap()
            // console.log("response form goofle",res)
            navigate("/")
            toast.success(res.message || "Login Success")

        } catch (error) {
            toast.error(error.message || "Login failed")
        }
    }
    return (
        <button disabled={isLoading} className='flex items-center gap-2 border border-gray-300 w-full py-2 justify-center rounded-md' onClick={handleLogin}>
            <FcGoogle className='text-xl' />
            <span>Continue With Google</span>
        </button>
    )
}

export default GoogleLogin