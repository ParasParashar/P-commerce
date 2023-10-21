"use client"

import { useRouter } from 'next/navigation'
import {AiOutlineDoubleLeft} from 'react-icons/ai'

const BackButton = () => {
const router = useRouter();

  return (
    <div onClick={()=>router.back()} className="p-3 rounded-full hover:bg-[rgb(41,43,45)] cursor-pointer flex items-center gap-2 font-bold text-gray-400 ">
      <AiOutlineDoubleLeft
      size={40}
      className=" text-fuchsia-500"
      />
      Back
    </div>
  )
}

export default BackButton
