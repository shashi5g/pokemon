const api = 'https://pokeapi.co/api/v2/pokemon';
export function compare(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }
}

export async function fetchData(limit,offset=0) {
  let apiUrl = `${api}?offset=${offset}&limit=${limit}`
  let cardsList = await fetch(apiUrl).then(response => response.json())

  const pokemons = await Promise.all(cardsList.results.map(async (card) => {
    card = await fetch(card.url).then(response => response.json())

    return {
      name: card.name,
      height: card.height,
      weight: card.weight,
      abilities: card.abilities,
      id: card.id

    }
  }))
  return {
    count: cardsList.count,
    next: cardsList.next,
    previous: cardsList.previous,
    pokemons
  };
}

export function parseIdFromUrl(url = '') {
  if(!url){
    return ;
  }
     const  qString = url.split("?")[1];
     if(qString){
      const params = qString.split("&");
      if(params){
       const offset = params[0].split("=")[1];
       const limit= params[1].split("=")[1];
       return {offset,limit}

      }
      return ''
     }
}

export function getUrlParameter(querystring, variable, doNotDecode) {
  //Remove the question mark
  querystring = querystring.substr(1);

  var variables = querystring.split("&"),
      numberOfVariables = variables.length,
      i = 0;

  for (i; i < numberOfVariables; i++) {
      var currentPair = variables[i].split("=");
      if (currentPair[0] == variable) {
          return doNotDecode
              ? currentPair[1]
              : decodeURIComponent(currentPair[1]);
      }
  }

  return undefined; //If no variable of the requested name is found
}