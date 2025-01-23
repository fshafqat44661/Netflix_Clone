import React, { useState } from "react";

const FilterModal = ({ isOpen, closeModal, applyFilters }) => {
  const [language, setLanguage] = useState("");
  const [popularity, setPopularity] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isPopularityDropdownOpen, setIsPopularityDropdownOpen] =
    useState(false);

  const languages = ["English", "Korean", "Chinese", "German"];
  const popularityOptions = ["High", "Medium", "Low"];
  const releaseDateOptions = ["This Year", "Last Year", "Older"];

  const handleApplyFilters = () => {
    applyFilters({ language, popularity, releaseDate });
    closeModal();
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 bg-gray-800 bg-opacity-50`}
    >
      <div className="relative left-1/2 top-1/4 flex h-[450px] w-96 -translate-x-1/2 transform flex-col rounded-lg bg-gray-100 p-6 shadow-lg">
        <button
          onClick={closeModal}
          className="absolute right-7 top-[30px] text-gray-600 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="mb-6 text-center text-2xl font-semibold">
          Filter Movies
        </h2>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Language
          </label>
          <div className="custom-dropdown-container">
            <button
              className="custom-dropdown-button flex items-center justify-between"
              onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
            >
              <span>{language || "Select Language"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <ul className="custom-dropdown-options">
                {languages.map((lang, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setLanguage(lang.toLowerCase());
                      setIsLanguageDropdownOpen(false); // Close dropdown on selection
                    }}
                    className="custom-dropdown-option"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Popularity Dropdown */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Popularity
          </label>
          <div className="custom-dropdown-container">
            <button
              className="custom-dropdown-button flex items-center justify-between"
              onClick={() => setIsPopularityDropdownOpen((prev) => !prev)}
            >
              <span>{popularity || "Select Popularity"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-200 ${
                  isPopularityDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isPopularityDropdownOpen && (
              <ul className="custom-dropdown-options">
                {popularityOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setPopularity(option.toLowerCase());
                      setIsPopularityDropdownOpen(false); // Close dropdown on selection
                    }}
                    className="custom-dropdown-option"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Release Date Buttons */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Release Date
          </label>
          <div className="flex space-x-4">
            {releaseDateOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setReleaseDate(option.toLowerCase())}
                className={`rounded-lg border px-4 py-2 transition-all duration-300 ${
                  releaseDate === option.toLowerCase()
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
