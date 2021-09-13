import React from 'react';
import SearchBox from '../SearchBox/SearchBox'
import Sorting from '../Sorting/Sorting'
import NextPrev from '../NextPrev/NextPrev'
import SelectPageSize from '../SelectPageSize/SelectPageSize'
import { compare, fetchData,getUrlParameter, parseIdFromUrl } from '../../utilities/utiliti'
import CardList from '../CardList/CardList';
class SearchContent extends React.Component {
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
    const value = event.target.value;
    this.updateDataOnSort(value);
    const qstring = this.props.history.location.search;
    if(qstring.length) {
     const searchTerm = getUrlParameter(qstring,'searchTerm',false);
     this.props.history.push(`search?searchTerm=${searchTerm}&srule=${value}`)
    }
    else{
      this.props.history.push(`home?srule=${value}`)
    }
   

  }
  updateDataOnSort(value) {
    let sortedData = []
    this.setState({ sort: value })
    const { pokemons } = this.state;
    sortedData = pokemons.sort(compare(value));
    this.setState({ pokemons: sortedData })
  }
  searchFilter() {
    const { search } = this.state;
    this.updateDataOnSearch(search)
    const pathname = this.props.history.location.pathname;
    const qstring = this.props.history.location.search;
    if(qstring.length) {
     const sortingAttr = getUrlParameter(qstring,'srule',false);
     this.props.history.push(`search?searchTerm=${search}&srule=${sortingAttr}`)
    }
    else{
      this.props.history.push(`search?searchTerm=${search}`)
    }
  }
  updateDataOnSearch(search) {
    const { pokemons } = this.state;
    const filterData =[]
    const sortedData = pokemons.filter(item => {
      const tyi = item.abilities.filter((ability)=>{
        if(ability.ability.name.includes(search.toLowerCase())){
          filterData.push(item)
        }
        
      });
      if(item.name.includes(search)){
        filterData.push(item)
      }
    });
    if(filterData.length<1){
      this.setState({
        count: 0
      })
    }
    this.setState({ pokemons: filterData })
  }

  Next() {
    const { next } = this.state;
    const { limit, offset } = parseIdFromUrl(next);
    const srule = getUrlParameter(this.props.location.search,'srule',false)
    const searchTerm = getUrlParameter(this.props.location.search,'searchTerm',false)
    fetchData(limit, offset).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    }).then(() => {
      if(searchTerm){
        this.updateDataOnSearch(searchTerm)
      }
      if(srule){
        this.updateDataOnSort(srule);
      }
    });
  }
  Prev() {
    const { prev } = this.state;
    if(!prev){
      return false;
    }
    const srule = getUrlParameter(this.props.location.search,'srule',false)
    const searchTerm = getUrlParameter(this.props.location.search,'searchTerm',false)
    const params = parseIdFromUrl(prev);
    fetchData(params.limit, params.offset).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    }).then(() => {
      if(searchTerm){
        this.updateDataOnSearch(searchTerm)
      }
      if(srule){
        this.updateDataOnSort(srule);
      }
    });
  }
  componentDidMount() {
    const srule = getUrlParameter(this.props.location.search,'srule',false)
    const searchTerm = getUrlParameter(this.props.location.search,'searchTerm',false)

    const { limit } = this.state;
    fetchData(limit).then(data => {
      this.setState({
        pokemons: data.pokemons,
        next: data.next,
        prev: data.previous,
        count: data.count
      })
    }).then(() => {
      if(searchTerm){
        this.updateDataOnSearch(searchTerm)
      }
      if(srule){
        this.updateDataOnSort(srule);
      }
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
        <strong className="count">Count : {count}</strong>
        {pokemons .length >0 ?<CardList pokemons={pokemons} />:'No More results'}
        <NextPrev Next={this.Next} Prev={this.Prev} isNextEnable={next} isPrevDisable={prev} />
      </div>
    </div>
    );
  }
}
export default SearchContent;