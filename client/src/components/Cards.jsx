import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2'

const Cards = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { name, image, price, recipe, _id } = item

  //get user
  const { user } = useContext(AuthContext)
  console.log(user)

  const navigate = useNavigate()
  const location = useLocation()


  //add to cart button
  const handleAddToCart = () => {
    console.log('added to cart', item);
    if (user && user?.email) {
      const cartItem = { menuItemId: _id, name, image, quantity: 1, price, email: user.email }
      // console.log(cartItem)
      fetch('http://localhost:6001/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then(res => res.json())
        .then(data => {
          //console.log(data)
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    } else {
      Swal.fire({
        title: "Login Required",
        text: "Sign in to your account to proceed !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SignUp Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', { state: { from: location } })
        }
      });
    }


  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card  w-[350px] h-78 bg-base-100  mb-8 mt-8 shadow-xl bg-slate-100 relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? 'text-rose-500' : 'text-white'
          }`}
      >
        <FaHeart
          className="h-4 w-4 cursor-pointer"
          onClick={handleHeartClick}
        />
      </div>

      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="object-cover mt-3 -mb-6 w-48 h-full sm:h-48 hover:scale-105 transition-all duration-200"
          />
        </figure>
      </Link>

      <div className="card-body">
        <h2 className="card-title -mt-4">{item.name}</h2>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center   ">
          <h5 className="font-semibold ">
            <span className="text-m text-red flex gap-2  mt-6"> <h5>RS  </h5> {item.price}</span>
          </h5>
          <button className="btn   mt-4   w-28    h-2 bg-green text-white hover:bg-hovergreen border-none"
            onClick={() => handleAddToCart(item)}
          >
            Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;