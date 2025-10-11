// import React from 'react'

// const animeCard = ({anime: title, vote_avarage, poster_path, release_date, original_language}) => {
//   return (
//     <div className='anime-card'>
//         <img src={poster_path ? `https//images.tmdb.org/t/p/w500/${poster_path}` : './no-anime.png'} alt={title} />

//         <div className='mt-4'>
//             <h3>{title}</h3>

//             <div className='content'>
//                 <div className="rating">
//                     <img src="star.svg" alt="Star Icon" />
//                     <p>{vote_avarage ? vote_avarage.toFixed(1) : 'N/A'}</p>
//                 </div>
//                 <span>•</span>

//                 <p className="lang">{original_language}</p>
//                 <span>•</span>
//                 <p className="year">{release_date ? release_date.Split('-') : 'N/A'}</p>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default animeCard







import React from 'react';

const AnimeCard = ({ anime }) => {

  const title = anime.title || anime.title_english || "Untitled";
  const image = anime.images?.jpg?.image_url || "./no-anime.png";
  const rating = anime.score ? anime.score.toFixed(1) : "N/A";
  const type = anime.type || "N/A";
  const year = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : "N/A";

  return (
    <div className='anime-card'>
      <img src={image} alt={title} />

      <div className='anime-content'>
        <h3>{title}</h3>

        <div className='content'>
          <div className='rating'>
            <img src='star.svg' alt='Star Icon' />
            <p>{rating}</p>
          </div>

          <div className='lang'>
            <p>{type}</p>
          </div>

          <div className='year'>
            <p>{year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
