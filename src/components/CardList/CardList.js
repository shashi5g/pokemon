import './CardList.css';
import CardListItem from '../CardListItem/CardListItem';
 const CardList = ({pokemons}) =>(  
    <div className='card-list'>

    {pokemons.map((pokemon, i) => (
       <CardListItem key={i} pokemon={pokemon}/>
    ))}
  </div>
);

export default CardList;