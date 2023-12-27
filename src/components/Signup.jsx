import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //authintication
  const {createUser,login} = useContext(AuthContext);

  //redirecting to the Home page or spesefic page
  const location = useLocation()
  const navigate =useNavigate()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email,password).then((result) => {
        // Signed up 
        const user = result.user;
        alert('account created successfully')
        document.getElementById('my_modal_5').close()
            navigate(from,{replace:true})
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });


  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-2xl rounded-md">
        <h2 className="text-2xl text-center text-gray-700 font-bold mb-8">
          Create an Account
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src="/Icons/reg1.png"
            alt="register"
            className="rounded-full w-36 h-36"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-white border border-gray-300 rounded  mb-1 py-2"
              {...register('fullName', { required: 'Full Name is required' })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
             className="btn text-lg h-12 w-full text-slate-700 bg-green hover:bg-hovergreen border-none " type='submit' value='register'
              
            >
              Sign Up
            </button>
          </div>

              {/* close button */}
              <Link 
                        to="/"
                           
                            className="btn bg-slate-200 text-black btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        


        </form>
        <p className="text-center mt-4 text-gray-700">
          Already have an account?
          <button className="ml-2 text-blue-500 hover:underline" to="/login"
          onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            Log In Now
          </button>
          <Modal/>
        </p>
      </div>
    </div>
  );
};

export default Signup;
