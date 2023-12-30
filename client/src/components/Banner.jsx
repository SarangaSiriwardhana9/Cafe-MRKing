import React from 'react';

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        {/* small cards */}
        <div className='md:w-1/2'>
          <img src='/banner.png' alt='banner' className='w-full' />
          <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-4'>
            <div className='flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-52'>
              <img src='/b-food1.png' alt='leaf' className='rounded-2xl w-[4rem] h-[4rem]' />
              <div className='space-y-1'>
                <h5 className='font-medium mb-1 text-sm'>Spicy Noodles</h5>
                <div className='rating rating-sm'>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly />
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly />
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly checked />
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly />
                  
                </div>
                <p className='text-red text-sm'>RS 1200</p>
              </div>
            </div>
            <div className='sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-52'>
              <img src='/b-food1.png' alt='leaf' className='rounded-2xl w-[4rem] h-[4rem] ' />
              <div className='space-y-1'>
                <h5 className='font-medium mb-1 text-sm'>Spicy Noodles</h5>
                <div className='rating rating-sm'>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly checked />
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-orange-400' readOnly/>
                
                </div>
                <p className='text-red text-sm'>RS 1200</p>
              </div>
            </div>
          </div>
        </div>
        {/* Text */}
        <div className='md:w-1/2 space-y-7 px-4'>
          <h2 className='md:text-5xl text-gray-800 text-4xl font-bold md:leading-snug leading-snug'>
            Dive Into Delights Of Delectable <span className='text-green'>Food</span>
          </h2>
          <p className='text-gray-600 text-xl mt-4'>
            where each plate waves a story of joy, love, and laughter with passionate craftsmanship.
          </p>
          <button className='bg-green text-white px-8 py-3 hover:bg-hovergreen font-semibold mt-8 rounded-full shadow-lg hover:shadow-none hover:bg-green-600 transition-all duration-300'>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;