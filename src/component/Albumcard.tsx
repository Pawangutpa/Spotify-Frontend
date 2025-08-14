import React from 'react';
import { useNavigate } from 'react-router-dom';
interface AlbumCardProps{
    image:string,
    name:string,
    desc:string,
    id:string
}
const Albumcard:React.FC<AlbumCardProps> = ({image,name,desc,id}) => {
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate("/album/"+id)} className='min-w-[180px] px-3 p-2 rounded cursor-pointer hover:bg-[#ffffff26]'>AlbumCard
    <img src={image} className='rounded w-[160px]' alt="" />
    <p className='font-bold mt-2 mb-1'>{name.slice(0,12)}....</p>
    <p className='text-slate-200 text-sm'>{desc.slice(0,18)}...</p>
      how are you
    </div>
  )
}

export default Albumcard
