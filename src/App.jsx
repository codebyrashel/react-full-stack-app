// import React, { useState, useEffect } from "react";
// import Search from './components/Search.jsx'
// import Spinner from "./components/Spinner.jsx";
// import { useDebounce } from 'react-use'
// import { updateSearchCount } from './appwrite.js'
// import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
 
// export const App = () => {
  
// // API - Application programming Interface - a set of rules that allows one software application to talk another

//   const API_BASE_URL = 'https://jaybeeanime.vercel.app/'

//   const API_KEY = ""

//   const API_OPTIONS = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//     }
//   }

//   const [searchTerm, setSearchTerm] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [animeList, setAnimeList] = useState([]);
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

//   // Debounce the search term to prevent making too many API requests by waiting for the user to stop typing for 55ms
//   useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

//   const fetchAnime = async (query= '') => {
//     setIsLoading(true);
//     setErrorMessage('');


//     try{
//       const endpoint = query
//       ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//       : `${API_BASE_URL}/discovery/movie?sort_by=popularity.desc`;

//       const response = await fetch(endpoint, API_OPTIONS);


//       if(!response.ok) {
//         throw new Error('Failed to fetch animes');
//       }else{
//         const data = await response.json();
//       }
//       if(data.Response === 'False'){
//         setErrorMessage(data.Error || "Failed to fetch Animes");
//         setAnimeList([]);
//         return
//       }

//       setAnimeList(data.results || []);

//       if(query && data.results.length > 0){
//         await updateSearchCount(query, data.results[0]);
//       }
//     } catch(error){
//       console.log(`Error Fetching Anime's: ${error}`)
//       setErrorMessage('Error fetching Anime. Please try again later')
//     }finally{
//       setIsLoading(false);
//     }
//   }

//   const loadTrendingMovies = async () => {
//     try {
//       const movies = await getTrendingMovies();
//       setTrendingMovies(movies);
//     } catch (error){
//       console.error(`Error fetching trending movies: ${error}`);
      
//     }
//   }

//   useEffect(() => {
//     fetchAnime(debouncedSearchTerm)
//   }, [debouncedSearchTerm]);


//   useEffect (() => {
//     loadTrendingMovies();
//   }, []);


//   return (
//     <main>
//       <div className="pattern" />

//       <div className="wrapper"> 
//         <header>
//           <img src="./hero.png" alt="Hero Banner" />
//           <h1>Find <span className="text-gradient">Anime's</span> You'll Enjoy Without the Hassle</h1>
//         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         </header>

//         {trendingMovies.length > 0 && (
//           <section className="trending">
//             <h2>Trending ANimes</h2>
//             <ul>
//               {trendingMovies.map((movies, index) => (
//                 <li key={movie.$id}>
//                   <p>{index + 1}</p>
//                   <img src="{movie.poster_url" alt="{movie.title}" />
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         <section className="all-anime">
//           <h2>All Anime</h2>

//           {isLoading ? (
//             <Spinner />
//           ) : errorMessage ? (
//             <p className="text-red-500">{errorMessage}</p>
//           ) : (
//             <ul>
//               {animeList.map(anime) => (
//                 <animeCard key={anime.id} anime={anime} />
//               )}
//             </ul>
//           ) }
//         </section>
//       </div>
//     </main>
//   );
// };

// export default App;















import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import AnimeCard from "./components/animeCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";

export const App = () => {
  // Jikan API (works reliably)
  const API_BASE_URL = "https://api.jikan.moe/v4";

  const API_OPTIONS = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search input
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Fetch anime list (fixed API + parsing)
  const fetchAnime = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // If query exists → search; else → fetch top anime
      const endpoint =
        query && query.trim() !== ""
          ? `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=20`
          : `${API_BASE_URL}/top/anime`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }

      const data = await response.json();
      const results = data.data || [];

      if (results.length === 0) {
        setErrorMessage("No results found");
        setAnimeList([]);
        return;
      }

      setAnimeList(results);

      // Update Appwrite metrics when user is searching
      if (query && results.length > 0) {
        await updateSearchCount(query, results[0]);
      }
    } catch (error) {
      console.error("Error Fetching Anime:", error);
      setErrorMessage("Error fetching Anime. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trending (from Appwrite)
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      if (Array.isArray(movies)) setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  // Trigger fetch when debounced search term changes
  useEffect(() => {
    fetchAnime(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Load trending on mount (via Appwrite)
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Anime's</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Animes</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id || index}>
                  <p className="font-bold mb-2">{index + 1}</p>
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-[240px] h-[300px] rounded-lg shadow-lg"
                  />
                  {/* <p className="mt-2 text-center text-sm text-gray-700">
                    {movie.title}
                  </p> */}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-anime mt-[40px]">
          <h2>All Anime</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {animeList.map((anime) => (
                <li key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;