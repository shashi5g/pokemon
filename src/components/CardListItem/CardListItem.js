import {
    Link
  } from "react-router-dom";
  import Tile from "../Tile/Tile";
 const CardListItem = ({pokemon}) =>(  
   
    <div className="card-continer">
    <Link
        to={{
        pathname: `/details/${pokemon.id}`,
        }}
    >
      <img alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
    </Link>
      <Tile name={pokemon.name} 
      height={pokemon.height} 
      weight={pokemon.weight} 
      abilities={pokemon.abilities}
      />
    
  </div>

);

export default CardListItem;