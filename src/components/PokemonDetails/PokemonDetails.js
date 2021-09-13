import  {useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import './PokemonDetails.css';

import Tile from '../Tile/Tile';
const api = 'https://pokeapi.co/api/v2/pokemon';

export async function getDetails(id) {
  let apiUrl = `${api}/${id}`;
  return fetch(apiUrl)
    .then(data => data.json())
}

function gameInex(items,gameIndexTitle,gameVersion){


  return items.map(item=>{
    return <div className="game-index">
      <div className="info-left">
        <h3>{gameIndexTitle}: {item.game_index}</h3>
        <h4>{gameVersion} : <a href={item.version.url}>{item.version.name}</a>
        </h4>

      </div>
    </div>
  })
//   return 
}

function gameType(items){


  return items.map(item=>{
    return <div className="game-type">
      <div className="info-left">
        <h3>{'slot'}: {item.slot}</h3>
        <h4>{'type'} : <a href={item.type.url}>{item.type.name}</a></h4>
      </div>
    </div>
  })
//   return 
}

function gameStat(items){


  return items.map(item=>{
    return <div className="game-stat">
      <div className="info-left">
        <h3>{'base_stat'}: {item.base_stat}</h3>
        <h3>{'effort'}: {item.effort}</h3>
        <h4>{'stat'} : <a href={item.stat.url}>{item.stat.name}</a></h4>
       

      </div>
    </div>
  })
//   return 
}

const PokemonDetails = function(){  
  let { id } = useParams();
  let [pokemonsDetails,setPokemonData] = useState(null)

  useEffect(() => {
  getDetails(id)
      .then(items => {
        console.log(items)
        setPokemonData(items)
      })
  }, [])
  
  
  return pokemonsDetails ? <div className="pokemon-details">
          <div className="image-tile"><img alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonsDetails.id}.png`} />
          <Tile name={pokemonsDetails.name} height={pokemonsDetails.height}
           weight={pokemonsDetails.weight} abilities={pokemonsDetails.abilities}/>
            <div className="info">
         <span>base experience :{pokemonsDetails.base_experience}</span>
           <span>Order :{pokemonsDetails.order}</span>
           <a href={pokemonsDetails.location_area_encounters}>{'location area encounters'}</a>
         </div>
           </div>
           <h3>Game Index</h3>
         <div className='gameInex'>
         
           {gameInex(pokemonsDetails.game_indices,'game index','version')}
          </div>
          <h3>Stat Type</h3>
          <div className='gameType'>
       
           {gameType(pokemonsDetails.types)}
           </div>
           <h3>Base Stat</h3>
           <div className='gameStat'>
        
           {gameStat(pokemonsDetails.stats)}
           </div>
        </div>:''
}
 

export default PokemonDetails;