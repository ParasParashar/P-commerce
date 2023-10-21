import { ClientUser } from "@prisma/client"
import Link from "next/link"
import { AiFillEdit } from "react-icons/ai";

type userProps={
    user:ClientUser
}
const UserInfo = ({user}:userProps) => {
  return (
    <div className="bg-[#1e1d1d] rounded-xl p-3">
          <h5 className="text-gray-500 text-2xl text-center">User Details</h5>
          <p className="text-lg text-sky-300">
            Name:
            <span className="text-neutral-300">{user.name}</span>
          </p>
          <p className="text-lg text-sky-300">
            Email:
            <span className="text-neutral-300">{user.email}</span>
          </p>
          <p className="text-lg text-sky-300">
            Address:
            <span className="text-neutral-300">{user.address}</span>
          </p>
          <p className="text-lg text-sky-300">
            Pincode:
            <span className="text-neutral-300">{user.pincode}</span>
          </p>
          <Link href={"/onboarding"}>
            <div className="ml-auto w-1/12">
              <AiFillEdit
                className="p-1 cursor-pointer rounded-full hover:bg-[rgb(41,43,45)] "
                size={30}
              />
            </div>
          </Link>
        </div>
  )
}

export default UserInfo
