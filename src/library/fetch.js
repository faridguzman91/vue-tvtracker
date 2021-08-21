//set url fetch adress
const baseUri = 'https://api.tvmaze.com/'


//fetch gegevens opvangen door parameters , geef json resultaat terug
export default {
    get(params) {
        let url = baseUri + params

        return fetch(url)
            .then(resp => resp.json())
    }
}