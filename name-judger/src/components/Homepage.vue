<template>
  <div class="bg-base-200 w-screen h-screen">
    <div class="pt-24">
      <h1 class="text-center text-8xl text-base-content">Name Judger</h1>
    </div>
    <div class="pt-24 w-5/6 center-vertical">

    </div>
    <div class="center flex flex-col">
      <h1 class="text-3xl text-center text-base-content">
        Please enter your name here:
      </h1>
      <input
        type="text"
        class="input mt-6 shadow-md input-primary input-bordered"
        @keyup.enter="getData"
        placeholder="Enter Your Name..."
      />
      <button class="mt-8 btn btn-accent" @click="getData">Get Data</button>
    </div>
  </div>
</template>

<script>
import NationalizerAPI from "../js/covidAPI.js";

export default {
  data() {
    return {
      countries: [],
      data:[],
      infectedPeople: "Please enter country",
    };
  },

  methods: {

    peopleInfected(type) {
      if(this.data.length){
      let number = this.data[this.data.length - 1][type];
      console.log(number);
      return number;
      }
      else{return "Please enter country"}
    },
    

    getData() {
        this.covidAPI.getData(this.country.toLowerCase()).then((data) => {
          console.log(data);
          this.data = data;
        });
      },
    },

  mounted(){
    this.nationalizerAPI = new NationalizerAPI();
    this.countries = this.covidAPI.getCountries()
  }
};
</script>

<style>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
.center-vertical {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 10px;
}
</style>