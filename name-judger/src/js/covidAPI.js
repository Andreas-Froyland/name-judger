import FetchWrapper from "./fetch-wrapper.js"

const API = new FetchWrapper("https://api.covid19api.com");

export default class CovidAPI {
    // constructor() {
    //     this.baseURL = baseURL;
    // }

    getCountries() {
        return API.get("/countries")
    }

    getData(country){
        return API.get(`/live/country/${country}`)
    }
}