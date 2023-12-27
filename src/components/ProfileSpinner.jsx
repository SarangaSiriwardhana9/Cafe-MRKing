import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { CgProfile } from 'react-icons/cg';
import { FaVanShuttle } from 'react-icons/fa6';
import { IoSettings } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';
import { IoMdLogOut } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

const ProfileSpinner = ({ user }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        alert("Logout Successfully");
        // Reload the page after logout
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });

    // Close the drawer by unchecking the checkbox
    const drawerCheckbox = document.getElementById('my-drawer-4');
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}

          {/* Open drawer */}
          <label htmlFor="my-drawer-4">
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="" className="rounded-full w-10 h-10" />
            ) : (
              <FaUserCircle  className=" w-8 h-8 text-green mt-1 text-xl" />
            )}
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-slate-50 text-base-content text-slate-600 ">
            {/* Sidebar content here */}
            <li>
              <a
                className="flex items-center block py-4 px-8  text-base hover:bg-lightHoverGreen text-green-600"
                href="/update-profile"
              >
                <CgProfile className="mr-2 text-xl" />
                Profile
              </a>
            </li>
            <li>
              <a
                className="flex items-center block py-4 px-8  text-base hover:bg-lightHoverGreen text-green-600"
                href="#"
              >
                <FaVanShuttle className="mr-2 text-xl" />
                Orders
              </a>
            </li>
            <li>
              <a
                className="flex items-center block py-4 px-8 text-base hover:bg-lightHoverGreen text-green-600"
                href="#"
              >
                <IoSettings className="mr-2 text-xl" />
                Settings
              </a>
            </li>
            <li>
              <a
                className="flex items-center block py-4 px-8  text-base hover:bg-lightHoverGreen text-green-600"
                href="#"
              >
                <IoCall className="mr-2 text-xl" />
                Contact
              </a>
            </li>
            <li>
              <a
                className="flex items-center block py-4 px-8  text-base hover:bg-LightHoverRed text-red-600"
                onClick={handleLogout}
              >
                <IoMdLogOut className="mr-2 text-xl" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSpinner;
