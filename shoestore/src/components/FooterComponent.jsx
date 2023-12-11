import logo from "../assets/images/logo-foot.png";
import { Link } from "react-router-dom";

import facebookIcon from "../assets/images/facebook-icon.png";
import instagramIcon from "../assets/images/instagram-icon.png";
import tiktokIcon from "../assets/images/tiktok-icon.png";
function FooterComponent() {
  return (
    <footer className="bg-black">
      <div className="grid grid-cols-2  px-6 py-8 md:grid-cols-4">
        <div className="flex justify-center items-center p-2">
          <Link to={""}>
            <img
              style={{ height: 200 }}
              src={logo}
              alt="logo"
              className="rounded-md"
            />
          </Link>
        </div>
        <div className="p-2">
          <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
            Address
          </h2>
          <iframe
            title="Address"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.3400548870786!2d-122.0011639!3d37.5234805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbf51099ff33d%3A0x5aa1a3338445da75!2s5904%20Newpark%20Mall%20Rd%2C%20Newark%2C%20CA%2094560%2C%20USA!5e0!3m2!1sen!2s!4v1688219852776!5m2!1sen!2s"
            width="100%"
            height="200"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div style={{ width: "150px" }} className="p-2">
          <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
            SUPPORT
          </h2>
          <ul className="text-gray-500 dark:text-gray-400">
            <li className="mb-4">
              <Link to={false} className="hover:underline">
                Order Tracking
              </Link>
            </li>
            <li className="mb-4">
              <Link to={false} className="hover:underline">
                Consumer Service
              </Link>
            </li>
            <li className="mb-4">
              <Link to={"/contact-us"} className="hover:underline">
                Email Our CEO
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ textAlign: "left" }} className="p-2">
          <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
            PROGRAMS
          </h2>
          <ul className="text-gray-500 dark:text-gray-400">
            <li className="mb-4">
              <Link to={false} className="hover:underline">
                Elite Club
              </Link>
            </li>
            <li className="mb-4">
              <Link to={false} className="hover:underline">
                Friend Rewards
              </Link>
            </li>
            <li className="mb-4">
              <Link to={false} className="hover:underline">
                Student Program
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
