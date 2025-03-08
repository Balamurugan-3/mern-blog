import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (query === "") {
    //         navigate("/")
    //     }
    // }, [query])

    const handleSearch = () => {
        const searchQuery = query.trim()
        if (searchQuery) {
            navigate(`/search?q=${searchQuery}`)
        }
    }

    const handleKeyDown = (e) => {
        // console.log("key:", e.key)
        if (e.key === "Enter" && query !== "") {
            handleSearch()
        }
    }

    return (
        <div className='w-96 bg-gray-100 rounded-full px-5 py-1 flex items-center '>
            <input type="text" placeholder="Search here..."
                className="w-full bg-transparent border-none outline-none h-8
                "
                value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
            <IoSearchOutline className='text-2xl' onClick={handleSearch}/>
        </div>
    )
}

export default SearchBox