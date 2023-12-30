import React, { useContext, useState } from 'react'
import useCart from '../../hooks/useCart'
import { FaTrash } from "react-icons/fa"
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider'

const CartPage = () => {

    const [cart, refetch] = useCart()
    const { user } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])





    /* handle delete button */

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#39DB4A",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:6001/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }

    /* handle decrease button */

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            fetch(`http://localhost:6001/carts/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quantity: item.quantity - 1 })

            })
                .then(res => res.json())
                .then(data => {
                    const updatedCart = cartItems.map((cartItem) => {
                        if (cartItem._id === item._id) {
                            return {
                                ...cartItem,
                                quantity: cartItem.quantity - 1
                            }
                        }
                        return cartItem
                    })
                    refetch()
                    setCartItems(updatedCart)

                })
        } else {
            alert('You can not decrease quantity less than 1')
        }
    }

    /* handle increase button */

    const handleIncrease = (item) => {
        fetch(`http://localhost:6001/carts/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })

        })
            .then(res => res.json())
            .then(data => {
                const updatedCart = cartItems.map((cartItem) => {
                    if (cartItem._id === item._id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1
                        }
                    }
                    return cartItem
                })
                refetch()
                setCartItems(updatedCart)

            })
    }

    //calculate price
    const calculatePrice = (item) => {
        return item.price * item.quantity
    }

    //calculate total price
   const cartSubTotal = cart.reduce((total, item) =>{
        return total + calculatePrice(item)
   },0)

   const orderTotal= cartSubTotal 
   return (
    <div className="section-container bg-white  min-h-screen">
      <div className="max-w-screen-2xl  mx-auto xl:px-8 pt-20 pb-16">
        <div className="bg-gradient-to-r from-[#f0f0f0] to-[#e2e2e2] shadow-lg   rounded-3xl p-4 md:p-8">
          {/* Banner */}
          <div className="mb-4 md:mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Items Added To The <span className="text-green-500">Cart</span>
            </h2>
          </div>

          {/* Table for the cart */}
          <div className="overflow-x-auto mb-8 mt-8 md:mb-8 rounded-2xl shadow-xl border-none ">
            <table className="w-full border-collapse border border-gray-300">
              {/* Table Header */}
              <thead className="bg-green text-white">
                <tr>
                  
                  <th className="py-2 hidden md:table-cell">Food</th>
                  <th className="py-2  ">Item Name</th>
                  <th className="py-2 hidden md:table-cell">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    
                    <td className="py-2 hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="item image"
                          className="w-12 h-12 object-cover rounded-full shadow-md"
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center text-slate-500">{item.name}</td>
                    <td className="py-2  hidden  md:table-cell">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="btn btn-ghost btn-sm text-red hover:bg-red-100"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center bg-white border text-slate-500 border-gray-300"
                          value={item.quantity}
                          onChange={() => console.log('item.quantity')}
                        />
                        <button
                          className="btn btn-ghost btn-sm text-green hover:bg-green-100"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 text-center text-slate-500">${calculatePrice(item).toFixed(2)}</td>
                    <td className="py-2 text-center">
                      <button
                        className="btn btn-ghost btn-xs text-red hover:bg-red-100 "
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 shadow-xl">
            <div className="bg-gray-50 p-4 md:p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2 md:mb-4 text-slate-600 ">Customer details</h3>
              <p className="mb-2 text-slate-500">Name: {user.displayName}</p>
              <p className="mb-2 text-slate-500">Email: {user.email}</p>
              <p className='text-slate-500'>User Id: {user.uid}</p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-md shadow-xl">
              <h3 className="text-xl font-semibold mb-2 md:mb-4 text-slate-600">Shopping details</h3>
              <p className="mb-2 text-slate-500">Total Items: {cart.length}</p>
              <p className="mb-2 text-slate-500">Total Price: ${orderTotal.toFixed(2)}</p>
              <button className="btn bg-green hover hover:bg-hovergreen border-none mt-2 md:mt-4 text-white">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
