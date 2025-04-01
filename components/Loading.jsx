import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      LOADING...
      <FontAwesomeIcon icon={faSpinner} className='text-slate-800 animate-spin text-4xl sm:text-5xl '/>
    </div>
  )
}
