import Link from 'next/link';
import Image from 'next/image';

const ProductList = () => {
  return (
    <div className="flex gap-x-8 gap-y-16 mt-12 justify-between flex-wrap">
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
        <div className='relative w-full h-80'>
            <Image src="/dev.jpeg" alt="" fill sizes='25vw'  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
            <Image src="/Auto03.jpg" alt="" fill sizes='25vw'className='absolute object-cover rounded-md'  />
        </div>
        <div className='flex justify-between' >
            <span className='font-medium'>Product Name</span>
            <span className='font-semibold'>Rs 6000</span>
        </div>
        <div className='text-sm text-gray-500'>Description of the product</div>
        <button className='rounded-2xl ring-1 w-max ring-laalhai text-laalhai py-2 px-4 text-xs hover:bg-laalhai hover:text-white' >Add to Cart</button>
        </Link>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
        <div className='relative w-full h-80'>
            <Image src="/dev.jpeg" alt="" fill sizes='25vw'  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
            <Image src="/Auto03.jpg" alt="" fill sizes='25vw'className='absolute object-cover rounded-md'  />
        </div>
        <div className='flex justify-between' >
            <span className='font-medium'>Product Name</span>
            <span className='font-semibold'>Rs 6000</span>
        </div>
        <div className='text-sm text-gray-500'>Description of the product</div>
        <button className='rounded-2xl ring-1 w-max ring-laalhai text-laalhai py-2 px-4 text-xs hover:bg-laalhai hover:text-white' >Add to Cart</button>
        </Link>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
        <div className='relative w-full h-80'>
            <Image src="/dev.jpeg" alt="" fill sizes='25vw'  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
            <Image src="/Auto03.jpg" alt="" fill sizes='25vw'className='absolute object-cover rounded-md'  />
        </div>
        <div className='flex justify-between' >
            <span className='font-medium'>Product Name</span>
            <span className='font-semibold'>Rs 6000</span>
        </div>
        <div className='text-sm text-gray-500'>Description of the product</div>
        <button className='rounded-2xl ring-1 w-max ring-laalhai text-laalhai py-2 px-4 text-xs hover:bg-laalhai hover:text-white' >Add to Cart</button>
        </Link>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
        <div className='relative w-full h-80'>
            <Image src="/dev.jpeg" alt="" fill sizes='25vw'  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
            <Image src="/Auto03.jpg" alt="" fill sizes='25vw'className='absolute object-cover rounded-md'  />
        </div>
        <div className='flex justify-between' >
            <span className='font-medium'>Product Name</span>
            <span className='font-semibold'>Rs 6000</span>
        </div>
        <div className='text-sm text-gray-500'>Description of the product</div>
        <button className='rounded-2xl ring-1 w-max ring-laalhai text-laalhai py-2 px-4 text-xs hover:bg-laalhai hover:text-white' >Add to Cart</button>
        </Link>
    </div>
  )
}

export default ProductList