import React from 'react';
import { useState, useEffect } from 'react';
import Cards from '../../components/Cards';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [curentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);


  // Loading data
  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6001/menu');
        const data = await response.json();
        //console.log(data)
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    // Call the function
    fetchData();
  }, []);

  // Filtering data based on category
  const filterItems = (category) => {
    const filtered = category === 'all' ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  // Sorting data
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    // Logic
    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'low-high':
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = curentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      {/* Menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          {/* Text */}
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-gray-800 text-4xl font-bold md:leading-snug leading-snug">
              For The Love Of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-gray-600 text-xl md:w-4/5 mx-auto mt-4">
              where each plate waves a story of joy, love, and laughter with passionate craftsmanship.
            </p>
            <button className="bg-green text-white px-8 py-3 hover:bg-hovergreen font-semibold mt-8 rounded-full shadow-lg hover:shadow-none hover:bg-green-600 transition-all duration-300">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Menu Shop Section */}
      <div className="section-container">
        {/* Filtering and Sorting */}


        <div className='flex flex-row justify-between items-center md:items-start gap-8 flex-wrap'>
          {/* Buttons */}
          <div>
            <button
              onClick={showAll}
              className={`w-24 mr-2 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'all' ? 'bg-green text-white' : ''
                }`}
            >
              All
            </button>
            <button
              onClick={() => filterItems('salad')}
              className={`w-24 mr-2 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'salad' ? 'bg-green text-white' : ''
                }`}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems('pizza')}
              className={`w-24 mr-2 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'pizza' ? 'bg-green text-white' : ''
                }`}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems('soup')}
              className={`w-24 mr-2 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'soup' ? 'bg-green text-white' : ''
                }`}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems('dessert')}
              className={`w-24 mr-2 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'dessert' ? 'bg-green text-white' : ''
                }`}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems('drinks')}
              className={`w-24 mr-2 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'drinks' ? 'bg-green text-white' : ''
                }`}
            >
              Drinks
            </button>
          </div>

          {/* Sorting */}
          <div className="relative">
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 bg-white border-none bordor-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent "
            >
              <option value="default" disabled selected>
                Sort by
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 fill-current text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 01-.7-.29l-4-4a1 1 0 111.41-1.42L10 9.17l3.29-3.3a1 1 0 111.42 1.42l-4 4a1 1 0 01-.71.29z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>


          {/* Product card */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {currentItems.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className='flex  justify-center my-8' >
        {
        Array.from ({length:Math.ceil(filteredItems.length / itemsPerPage)}).map((_, index) => (
        <button key={index} onClick={() => paginate(index + 1)}
        className={`px-4 mb-5 gap-6 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${curentPage === index + 1 ? 'bg-green text-white' : ''
                }`}
        >
          
          {index + 1}
        </button>
        ))
        }
      </div>



    </div>
      );
};

      export default Menu;