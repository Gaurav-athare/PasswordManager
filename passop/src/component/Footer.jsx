import React from 'react'

const Footer = () => {
  return (
    <div className=' text-white bg-green-900 h-[110px] rounded-b-xl'>
        <div className="flex flex-col items-center mt-5">
        <div className="text-black text-2xl font-bold mb-0">
          <span>
            <span className="text-green-500">&lt;</span>Pass
          </span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        </div>
        <div className='flex justify-center'>
            Created with <img className='w-9 px-1' src="heart-solid.svg" alt="" /> by Gaurav Athare
        </div>
    </div>
  )
}

export default Footer