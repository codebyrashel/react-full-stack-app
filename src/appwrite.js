// import { client, Datebases, ID, Query } from 'appwrite'

// const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// const client = new Client()
//   .setEndpoint('https://cloud.appwrite.io/v1')
//   .setProject(PROJECT_ID)

 
// const database = new Datebases(client);

// export const updateSearchCount = async (searchTerm, movie) => {
// // 1. Use Appwrite SDK to check if the search term exist in the database
// try{
//     const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID [
//         MediaQueryList.equal('searchTerm', searchTerm)
//     ])

// // 2. If it does, update the count
//     if(results.documents.length > 0){
//         const doc = results.documents[0];

//         await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//             count: doc.count + 1,
//         })
// // 3. If it doesn't create a new document with the search term and count and set the count as 1
//     } else{
//         await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique() {
//             searchTerm,
//             count: 1,
//             movie_id: movie.id,
//             poster_url: `https://api.jikan.moe/v4/${movie.poster_url}`,
//         })
//     }
// } catch (error){
//     console.log(error);
// }
// }

// export const getTrendingMovies = async () => {
//     try{
//         const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//             Query.limit(5),
//             Query.orderDesc("count"),
//         ])

//      return result.documents;   
//     } catch (error){
//         console.error(error);
//     }
// }






import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";

// Initialize client
const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

// Create a Databases instance
const databases = new Databases(client);

// increment or create a search count document
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Check if search term already exists
    const results = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    // 2. If it exists, increment the count
    if (results.documents.length > 0) {
      const doc = results.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // 3. Otherwise, create a new document
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id || movie.mal_id || "unknown",
        title: movie.title || movie.title_english || movie.name,
        poster_url:
          movie.poster_url ||
          movie.images?.jpg?.image_url ||
          movie.images?.webp?.image_url ||
          null,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

// Fetch trending (most-searched) movies from Appwrite
export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(4),
    ]);

    return result.documents;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// console.log("Loaded vars:", {
//   PROJECT_ID,
//   DATABASE_ID,
//   COLLECTION_ID,
//   ENDPOINT,
// });