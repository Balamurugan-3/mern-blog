import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userIcon from "../../assets/user.png"
import { useGetUserQuery, useUpdateUserMutation } from '../../store/features/user/userAPI'
import toast from 'react-hot-toast'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import Loading from '../../components/Loading'

const Profile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState("")

    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const { data: profile, isSuccess, isLoading } = useGetUserQuery(id) // get user data
    // console.log("profileData",profile)

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation() // update data
    // console.log("profile", profile)

    useEffect(() => {
        if (isSuccess) {
            setName(profile.user.name)
            setEmail(profile.user.email)
            setBio(profile.user.bio)
        }
    }, [profile])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        formData.append("user", JSON.stringify({ name, email, bio }))

        try {
            const res = await updateUser({ id, formData }).unwrap()
            // console.log("res on profile", res)
            navigate("/")
            toast.success(res.message || "User Profile Updated")
        } catch (error) {
            toast.error(error.message || "failed to update Profile")
        }
    }

    const handleFileUpload = async (files) => {
        const fileData = files[0];
        const preview = URL.createObjectURL(fileData)
        setFile(fileData)
        setFilePreview(preview)

    }

    if (isLoading || isUpdating) {
        return <Loading />
    }

    return (
        <div className='flex w-full justify-center items-center'>
            <form className='md:w-[80%] w-[100%] my-20 border-2 md:p-10 p-4 rounded-md' onSubmit={handleSubmit}>

                {/* The disign take time just undertand practice 2 times its easy but tricky */}
                <div className=' sm:size-28 size-24 mx-auto relative group rounded-full overflow-hidden'>
                    <Dropzone onDrop={acceptedFiles => handleFileUpload(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />

                                <img src={filePreview || profile?.user?.avatar || userIcon} alt="" className='size-28 rounded-full object-cover' />

                                <div className='w-full h-full absolute rounded-full left-[50%] top-0 -translate-x-[50%]
                                     bg-black  justify-center items-center bg-opacity-20 group-hover:flex hidden cursor-pointer
                                     border border-red-600'>
                                    <IoCameraOutline className='text-3xl text-white opacity-90' />
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>

                <div className="space-y-4 my-4">
                    <div className='flex flex-col gap-2 '>
                        <label className='text-base font-medium ms-1'>Name</label>
                        <input type="text" placeholder='Name' value={name}
                            className='py-2 px-3 border rounded-md outline-green-500'
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label className='text-base font-medium ms-1'>Email</label>
                        <input type="email" placeholder='Email' value={email}
                            className='py-2 px-3 border rounded-md outline-green-500'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label className='text-base font-medium ms-1'>Bio</label>
                        <textarea className='min-h-28 max-h-32 p-2 outline-green-500 border border-gray-200 rounded-md'
                            placeholder='Write About You...'
                            value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label className='text-base font-medium ms-1'>Password</label>
                        <input type="password" placeholder='Password' value={password}
                            className='py-2 px-3 border rounded-md outline-green-500'
                            onChange={(e) => setPassword(e.target.value)} disabled={true} />
                    </div>
                </div>
                <button className='mt-6 w-full bg-indigo-600 text-white font-medium py-2 rounded-md'
                    disabled={isLoading || isUpdating}>Save Changes</button>
            </form>

        </div>
    )
}

export default Profile