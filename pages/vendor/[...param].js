import React from 'react'
import { useRouter } from 'next/router'

const Vendor = () => {
  const router = useRouter()
  const { param } = router.query
  
  return (
    <div>{param} show which card will benefit them the most while shopping there</div>
  )
}

export default Vendor