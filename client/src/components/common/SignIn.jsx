import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SIgnin() {
  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <SignIn />
    </div>
  )
}

export default SIgnin