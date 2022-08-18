import React,{useState, useEffect} from 'react'
import Loader from './Loader';
import SongDetails from './SongDetails';
import SongForm from './SongForm';
import { helpHttp } from "../helpers/helpHttp";


const SongSearch = () => {

   const [search, setSearch] = useState(null); //Buscar la cancion
   const [lyric, setLyric] = useState(null); //Guardar la cancion
   const [bio, setBio] = useState(null); //Biografia
   const [loading, setLoading] = useState(null); //Cargar la cancion

   useEffect(  () =>{
    if(search === null) return;
   
  const fetchData = async () =>{
    const  {artist,song} = search;
  
    let artisUrl=`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
    let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    //console.log(artisUrl,songUrl);

    setLoading(true);

    const [artisRes,songRes] = await Promise.all([
      helpHttp().get(artisUrl),
      helpHttp().get(songUrl),
    ]);
    //console.log(artisRes, songRes);
    
    setBio(artisRes);
    setLyric(songRes);
    setLoading(false);
  };
  fetchData();
  },[search]);



   const handleSearch = (data) =>{
    ///console.log(data);
    setSearch(data);
   }

  return (
    <div>
       <h2>Song search</h2>
       <article className="grid-1-3 ">
       <SongForm handleSearch={handleSearch} />
       {loading && <Loader/>}
       {search && !loading && (
          <SongDetails search={search} lyric={lyric} bio={bio} />
       )}
       </article>
    </div>
  );
}

export default SongSearch
