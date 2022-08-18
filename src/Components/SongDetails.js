import React from 'react'
import SongArtist from './SongArtist'
import SongLyric from './SongLyric'
import Message from './Message'

const SongDetails = ({search,lyric,bio}) => {
 
  if( !lyric || !bio ) return null;


  return (
    <>
      
      {lyric.error || lyric.err || lyric.name === "Abort"?(
         <Message 
         msg={`Error: No Existe la Cancion '<em>${search.song}</em>'`}
         bgColor="#dc3545"
          />
           ): (
         <SongLyric title={search.song} lyrics={lyric.lyrics}/>
         )}
        { bio.artists? (
        <SongArtist artist={bio.artists[0]}/>
        ) : ( 
        <Message
          msg={`Error: No Existe el Interprete '<em>${search.artists}</em>'`}
          bgColor="#dc3545"
        />) }
        
    </>
  );
};

export default SongDetails;
