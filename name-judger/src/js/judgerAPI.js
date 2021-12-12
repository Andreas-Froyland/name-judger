import FetchWrapper from "./fetch-wrapper.js"

const nationalizerAPI = new FetchWrapper("https://api.nationalize.io");
const ageAPI = new FetchWrapper("https://api.agify.io");
const genderAPI = new FetchWrapper("https://api.genderize.io");

export default class CovidAPI {
    // constructor() {
    //     this.baseURL = baseURL;
    // }

    getNation(name) {
        return nationalizerAPI.get(`?name=${name}`)
    }

    getAge(name){
        return ageAPI.get(`?name=${name}`)
    }

    getGender(name){
        return genderAPI.get(`?name=${name}`)
    }
}