import React from 'react'
import { useForm } from "react-hook-form";
import AuthProvider, { AuthContext } from '../../contexts/AuthProvider';
import { useContext } from 'react';

const UpdateProfile = () => {
    const {updateUserProfile}=useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const name=data.name
        const photoURL=data.photoURL
        updateUserProfile(name,photoURL).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        {/* update profile header */}
                        <h1 className="text-3xl font-bold text-center">Update Profile</h1>
                        <label className="label">
                            <span className="label-text bg-slate-100 text-slate-700  ">Name</span>
                        </label>
                        <input {...register("name")} type="Name" placeholder="Your Name Here" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-700">Upload Photo</span>
                        </label>
                        <input {...register("photoURL")} type="Text" placeholder="Photo Url" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        {/* uploading image will be later */}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn text-lg h-12  text-slate-700 bg-green hover:bg-hovergreen border-none ">update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile