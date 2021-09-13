import React from 'react';
import SearchBox from '../SearchBox/SearchBox'
import Sorting from '../Sorting/Sorting'
import NextPrev from '../NextPrev/NextPrev'
import SelectPageSize from '../SelectPageSize/SelectPageSize'
import { compare, fetchData, parseIdFromUrl,getUrlParameter } from '../../utilities/utiliti'
import CardList from '../CardList/CardList';
import './Content.css';
class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemons: [],
      limit: 10,
      sort: '',
      next: '',
      prev: '',
      count: 0

    };
    this.handleChange = this.handleChange.bind(this);
    this.sorting = this.sorting.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.Next = this.Next.bind(this);
    this.Prev = this.Prev.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });

    fetchData(value, name).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    });

  }

  handleSearchInput(event) {
    const value = event.target.value;
    this.setState({
      search: value
    });
  }
  sorting(event) {
    
    const value = event.target.value ;
    this.sortingUpdate(value)
    this.props.history.push(`home?srule=${value}`)

  }

  sortingUpdate(value){
    let sortedData = []
    this.setState({ sort: value })
    const { pokemons } = this.state;
    sortedData = pokemons.sort(compare(value));
    this.setState({ pokemons: sortedData })
  }

  searchFilter() {
    const { pokemons, search } = this.state;
    const qstring = this.props.history.location.search;
    if(qstring.length) {
     const srule = getUrlParameter(qstring,'srule',false);
     this.props.history.push(`search?searchTerm=${search}&srule=${srule}`)
    }
    else{
      this.props.history.push(`/search?searchTerm=${search}`)

    }


  }
  Next() {
    const { next } = this.state;
    const { limit, offset } = parseIdFromUrl(next);

    fetchData(limit, offset).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    });
  }
  Prev() {
    const { prev } = this.state;
    const params = parseIdFromUrl(prev);
    fetchData(params.limit, params.offset).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    });
  }
  componentDidMount() {
    const { limit ,sort} = this.state;
    fetchData(limit).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    }).then(()=>{
      const qstring = this.props.history.location.search;
      const srule = getUrlParameter(qstring,'srule',false);
  
      this.sortingUpdate(srule)
    });
   
  }

  render() {

    const { pokemons, sort, search, pageSize, count, prev, next } = this.state;
    return (<div className="App">
      <header>
        <SearchBox search={search} handleButtonClick={this.searchFilter} handleSearchInput={this.handleSearchInput} />
      </header>
      <div className="main">
        <div className="user-activity">
          <div className="pageSize">
            <strong>Select page size</strong>
            <SelectPageSize pageSize={pageSize} handleSize={this.handleChange} />
          </div>
          <div className="sorting">
            <Sorting sort={sort} handleSorting={this.sorting} />
          </div>
          <NextPrev Next={this.Next} Prev={this.Prev} />
        </div>
        <strong>Count : {count}</strong>
        <CardList pokemons={pokemons} />
        <NextPrev Next={this.Next} Prev={this.Prev} isNextEnable={next} isPrevDisable={prev} />
      </div>
    </div>
    );
  }
}

export default Content;