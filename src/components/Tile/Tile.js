
 import './Tile.css';
 const Tile = ({name,height,weight,abilities}) =>(  
      <div className="pokemon-info">
        <div className="info-left">
          <h3>{name}</h3>
          <p>height :{height}</p>
          <p>weight :{weight}</p>
        </div>
        <div className="info-right">
          <h3>Abilities</h3>
          <ul className="abilities">
            {abilities.map((item,i) => {
              return <a  key={i} href={item.ability.url}><li>{item.ability.name}</li></a>
            })}
          </ul>
        </div>
      </div>
);

export default Tile;