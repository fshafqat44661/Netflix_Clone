import React, { useEffect, useState } from "react";
import axios from "../../Requests/axios";
import requests from "../../Requests/request";
import { Link } from "react-router-dom";
import { addId } from "../../Store/watchList";
import { useDispatch } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Trending = ({ searchQuery, filters }) => {
  const [trendingArray, setTrendingArray] = useState([]);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [closet, setCloset] = useState(false);
  let [count, setCount] = useState(0);

  const dispatch = useDispatch();
  display &&
    setTimeout(() => {
      setDisplay(false);
    }, 1000);

  useEffect(() => {
    async function TrendingMoviesFetcher() {
      const trendingArrayData = await axios.get(requests.fetchTrending);
      setTrendingArray(trendingArrayData.data.results);
    }
    TrendingMoviesFetcher();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const settleId = (payload) => {
    setCount(count++);
    async function MovieFetcher() {
      const response = await fetch(
        `https://api.themoviedb.org/3${payload}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const data = await response.json();
      dispatch(addId(data));
    }
    MovieFetcher();
  };

  const languageMap = {
    english: "en",
    korean: "ko",
    german: "de",
    chinese: "zh",
  };

  const filteredBySearch = searchQuery
    ? trendingArray.filter(
        (movie) =>
          movie.original_title &&
          movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trendingArray;

  const filteredArray = filteredBySearch.filter((movie) => {
    const filterLanguageCode = filters?.language
      ? languageMap[filters.language.toLowerCase()]
      : null;

    const languageMatch = filterLanguageCode
      ? movie.original_language.toLowerCase().startsWith(filterLanguageCode)
      : true;

    const popularityMatch = filters?.popularity
      ? (filters.popularity === "high" && movie.popularity >= 500) ||
        (filters.popularity === "medium" &&
          movie.popularity >= 100 &&
          movie.popularity < 500) ||
        (filters.popularity === "low" && movie.popularity < 100)
      : true;

    const releaseDateMatch = filters?.releaseDate
      ? filters.releaseDate === "this year"
        ? new Date(movie.release_date).getFullYear() ===
          new Date().getFullYear()
        : filters.releaseDate === "last year"
        ? new Date(movie.release_date).getFullYear() ===
          new Date().getFullYear() - 1
        : new Date(movie.release_date).getFullYear() <
          new Date().getFullYear() - 1
      : true;

    return languageMatch && popularityMatch && releaseDateMatch;
  });

  return (
    <div>
      <ul className="pb-1 md:mx-2 p-5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:pt-16 lg:pt-20  ">
        {filteredArray.length > 0 ? (
          filteredArray.map((i) => (
            <li
              className="mb-20 rounded-3xl border-b pb-6 text-white md:mb-5 md:border-4 md:border-zinc-800 md:py-6"
              key={i.id}
            >
              {loading ? (
                <div className="relative mx-auto h-52 animate-pulse space-y-5 overflow-hidden rounded-3xl bg-gray-800 bg-gradient-to-r from-transparent via-gray-600 to-transparent pb-2 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-gray-900 before:bg-gradient-to-r before:from-transparent before:via-gray-900 before:to-transparent md:h-[30rem] md:w-80 md:rounded-3xl">
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                      <Skeleton duration={2} />
                    </p>
                  </SkeletonTheme>
                </div>
              ) : (
                <>
                  {i && i.backdrop_path && (
                    <Link to={`/movie/${i.id}`}>
                      <img
                        className="rounded-3xl md:hidden"
                        src={`https://image.tmdb.org/t/p/original/${i.backdrop_path}`}
                        alt={i.original_title}
                      />
                      <img
                        className="hidden outline-double outline-4 outline-offset-8 outline-neutral-800 md:mx-auto md:mb-4 md:block md:w-80 md:rounded-3xl"
                        src={`https://image.tmdb.org/t/p/original/${i.poster_path}`}
                        alt=""
                      />
                    </Link>
                  )}
                </>
              )}
              <h1 className="flex md:block">
                <p className="ml-1 mt-1 w-[60vw] text-xl font-bold md:mx-auto md:w-fit md:text-2xl md:font-semibold">
                  {i.original_title ? i.original_title : "Not Available In API"}
                </p>
                <button
                  id={`/movie/${i.id}`}
                  className="ml-2 mt-2 whitespace-nowrap flex h-fit items-center rounded-lg bg-[#1f1f1feb] px-7 py-1 font-medium text-[#fbf9f9c8] md:mx-auto md:mt-4 md:px-24 md:py-2"
                  onClick={(e) => {
                    settleId(e.target.id), setDisplay(true);
                  }}
                >
                  <span className="mr-1 text-xl">+</span> My List
                </button>
              </h1>
              <h1
                className={`mt-2 px-1 text-sm font-extralight lg:ml-12 md:ml-2 md:text-base md:font-normal ${
                  closet
                    ? "h-fit overflow-visible"
                    : "h-[3.9rem] overflow-hidden md:h-[3.2rem]"
                }`}
              >
                {i.overview}
              </h1>
              <h1
                className={`${
                  closet ? "hidden" : "block"
                } relative bottom-2 left-1 top-[.009999rem] cursor-pointer text-sm font-extralight lg:ml-12 md:ml-2 md:w-fit md:text-base md:font-normal`}
                onClick={() => setCloset(true)}
              >
                more..
              </h1>
            </li>
          ))
        ) : (
          <p className="text-white">No movies found for the search query.</p>
        )}
      </ul>
      <p
        className={`fixed bottom-20 left-20 animate-pulse rounded-lg bg-[#000000] px-10 py-3 font-thin text-white md:left-[35rem] ${
          display ? "block" : "hidden"
        } `}
      >
        Added to WatchList
      </p>
    </div>
  );
};

export default Trending;
