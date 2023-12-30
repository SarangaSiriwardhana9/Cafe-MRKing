import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Modal.css'; // Import the custom CSS file
import { FaGoogle } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../contexts/AuthProvider';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


const Modal = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    //authintication
    const { signInWithGmail, login } = useContext(AuthContext);
    const [errormessage, setErrormessage] = useState("")

    //redirecting to the Home page or spesefic page
    const location = useLocation()
    const navigate =useNavigate()
    const from = location.state?.from?.pathname || '/'


    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;

        //console.log(email,password)
        login(email, password).then((result) => {
            const user = result.user;
            alert('login successfull')
            document.getElementById('my_modal_5').close()
            navigate(from,{replace:true})
        }).catch((error) => {
            const errorMessage = error.message;
            setErrormessage("please enter valid email and password")
        })
    }

    //google login
    const handleLogin = () => {
        signInWithGmail().then((result) => {
            const user = result.user;
            // Close the modal
            document.getElementById('my_modal_5').close();
            // Redirect to the home page
            navigate(from, { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div className=" top-0 left-0 w-full h-full flex items-center justify-center  ">
            <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
                <div className="modal-box bg-white">
                    <div className="modal-action flex flex-col mt-10 justify-center">

                        {/* Form */}

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className="card-title justify-center -mt-16 font-bold text-slate-600 text-xl"> Please Login !</h2>
                            <div className='flex justify-center' >
                                <img src='/Icons/login1.svg' alt='leaf' className='rounded-2xl -mt-8 -mb-12 justify-center w-[320px]  h-[220px]' />
                            </div>
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-slate-600  ">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input bg-white input-bordered  text-slate-600 h-12"   {...register("email")} />
                            </div>
                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-slate-600  ">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input bg-white input-bordered text-slate-600 h-12 "  {...register("password")} />
                                <label className="label">
                                    <a href="#" className="label-text-alt link text-slate-600  link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {/* error */}
                            {
                                errormessage ? <p className='text-red text-xs italic'>{errormessage}</p> : ""
                            }


                            {/* login button */}
                            <div className="form-control  justify-center mt-2">
                                <button className="btn text-lg h-12  text-slate-700 bg-green hover:bg-hovergreen border-none " type='submit' value='login' >Login</button>
                            </div>
                            <p className='text-center mt-2 -mb-3 text-slate-600'> Don't have an account ?<Link className=' underline text-red  ml-2' to="/signup">SignUp Now</Link> </p>
                            {/* close button */}
                            <Link
                                htmlFor="my_modal_5"
                                onClick={() => document.getElementById('my_modal_5').close()}
                                className="btn bg-slate-200 text-black btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        </form>

                        {/* social signin buttons */}
                        <div>

                            <div className="flex flex-row space-x-3 justify-center">
                                <button className="btn btn-circle text-slate-600 bg-white hover:bg-green hover:text-white hover:border-slate-400 border border-green "
                                    onClick={handleLogin}
                                >
                                    <FaGoogle />
                                </button>
                                <button className="btn btn-circle text-slate-600 bg-white hover:bg-green hover:text-white hover:border-slate-400 border border-green ">
                                    <TiSocialFacebook className='w-6 h-6' />
                                </button>

                                <button className="btn btn-circle text-slate-600 bg-white hover:bg-green hover:text-white hover:border-slate-400 border border-green ">
                                    <FaGithub />
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Modal;
