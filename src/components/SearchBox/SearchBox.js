import './SearchBox.css';
 const SearchBox = ({search,handleButtonClick,handleSearchInput}) =>( 
     <div className="searchbox"> 
        <input 
            name='search'
            className='search'
            type='search' 
            placeholder={'type name or abilities and click on search button'} 
            onChange={handleSearchInput}
            value={search}
        />
        <button className="search-submit" onClick={handleButtonClick}>Search</button>
    </div>

);
export default SearchBox;