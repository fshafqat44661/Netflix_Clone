import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Netflix from "../../assets/Netflix.webp";
import NetflixLOGO from "../../assets/NetFlix2.png";
import User1 from "../../assets/User1.png";
import User2 from "../../assets/User2.png";
import User3 from "../../assets/User3.jfif";
import User4 from "../../assets/User4.jpg";
import User5 from "../../assets/User5.png";
import { Link } from "react-router-dom";
import FilterModal from "../Pages/FilterModal";

const Header = ({ onSearch, applyFilters }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const openFilterModal = () => {
    setIsModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const userImage = useSelector((state) => {
    return state.ProfileData;
  });
  const listenScrollEvent = (event) => {
    if (window.scrollY > 7) {
      return setIsScrolled(true);
    } else if (window.scrollY < 7) {
      return setIsScrolled(false);
    }
  };
  return (
    <div
      className={`${
        isScrolled ? "md:bg-[#0c0c0cd5]" : "md:bg-transparent"
      } sticky top-0 z-10 flex items-center justify-between rounded-b-lg bg-[#0c0c0cee] px-3 text-zinc-600 md:fixed md:w-full md:rounded-b-none`}
    >
      <Link to="/home" className="md:ml-10">
        <img
          className="w-12 rounded-full bg-transparent md:hidden"
          src={Netflix}
          alt="Netflix Logo"
        />
        <img
          className="hidden md:block md:w-[7.5rem]"
          src={NetflixLOGO}
          alt="Netflix Logo"
        />
      </Link>

      <div className="ml-16 hidden font-medium text-white md:flex md:space-x-10">
        <Link to="/home" className="hover:text-zinc-600">
          Home
        </Link>
        <Link to="/new" className="hover:text-zinc-600">
          New & Popular
        </Link>
        <Link to="/watchlist" className="hover:text-zinc-600">
          My List
        </Link>
      </div>

      <div className="relative ml-auto hidden items-center md:flex">
        <svg
          className="absolute left-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="w-72 rounded-md bg-gray-800 px-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button onClick={openFilterModal} className="ml-4 text-white bg-gray-800 px-4 py-2 rounded">
        Filter
      </button>

      <Link to="/profile" className="ml-4 md:mr-12">
        <img
          className="w-7 rounded-sm md:w-9"
          src={eval(userImage)}
          alt="User Image"
        />
      </Link>

      <FilterModal isOpen={isModalOpen} closeModal={closeFilterModal} applyFilters={applyFilters} />
    </div>
  );
};

export default Header;
