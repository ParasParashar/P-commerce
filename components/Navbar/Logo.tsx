import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'}>

    <div className='relative w-20 h-20 object-cover '>
      <Image src='/logo/logo.png' alt='LOGO' fill className=' object-cover'/>
    </div>
    </Link>
  )
}

export default Logo
