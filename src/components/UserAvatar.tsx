import Image from "next/image"



const UserAvatar = ({image}: { image?: string}) => {
    return (
        <div className="w-full h-full relative rounded-md overflow-hidden">
            {image && <Image fill alt="Profile picture" src={image}/>}
        </div>
    )
}

export default UserAvatar