import React from 'react'

export default function layoutt({children}) {
  return (
    <div className='flex flex-col'>
      <div className='w-80 h-screen bg-blue-500 text-white'>Posts</div>
      {children}
    </div>
  )
}
