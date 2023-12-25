import React from 'react';

const categoryItems = [
    {
        id: 1,
        title: 'Main Dish',
        des: '86 dish',
        image: "/categories/img1.png"
    },
    {
        id: 2,
        title: 'Breakfast',
        des: '12 breakfast',
        image: "/categories/img2.png"
    },
    {
        id: 3,
        title: 'Dessert',
        des: '20 Desserts',
        image: "/categories/img3.png"
    },
    {
        id: 4,
        title: 'Browse All',
        des: '14 dinner',
        image: "/categories/img4.png"
    },
];

const Categories = () => {
    return (
        <div className='section-container py-16'>
            <div className='text-center'>
                <p className='subtitle'>Customers favourites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>

            {/* Category cards */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
                {categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5  w-71 mx-auto text-center cursor-pointer duration-300 transition-all hover:-translate-y-4'>
                        <div className='flex w-full mx-auto justify-center'>
                            <img src={item.image} alt={item.title}  className='bg-[#C1F1C6] mb-6 p-5 rounded-full w-28 h-28'/>
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h4 className='text-gray-600'>{item.title}</h4>
                            <p className='text-gray-600'>{item.des}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
