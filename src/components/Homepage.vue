<template>
  <div class="bg-base-200 w-screen h-screen">
    <div class="pt-24">
      <h1 class="text-center text-7xl text-base-content mb-6">Name Judger</h1>
    </div>
    <div
      class="pt-24 w-2/3 text-center text-4xl pb-6 m-auto"
      v-if="showText"
    >
      <span v-if="dataLoading">Loading data for: </span>

      <span class=" capitalize" 
        >{{person.name}}
      </span>
      
      <span v-if="!dataLoading && !person?.age"
        >, We could not find any data about your name...
      </span>

      <span class="pb-6" v-if="person.age">
      , You are a {{ person.age }} years old {{ person.gender }}
        <span class="pt-2" v-if="person.nation">from</span>
        {{ person.nation }}
        <span v-if="person.nationPercentage">({{ person.nationPercentage }}% chance)</span>
      </span>

      <span class="text-xl text-gray-300" v-if="person.secondNation">
        or {{ person.secondNation }}({{ person.secondNationPercentage }}% chance)
      </span >

      <span class="text-sm text-gray-500" v-if="person.thirdNation">
        or {{ person.thirdNation }}({{ person.thirdNationPercentage }}%chance)
      </span>

    </div>

    <div class="m-auto lg:w-1/3 sm:w-1/2 flex flex-col px-12">
      <h1 class="text-2xl text-center text-base-content">
        Please enter your name here:
      </h1>
      <input
        v-model="name"
        type="text"
        class="input mt-6 shadow-md input-primary input-bordered"
        @keyup.enter="getData"
        placeholder="Enter Your Name..."
      />
      <button class="mt-8 btn btn-accent" @click="getData()">Get Data</button>
    </div>
  </div>
</template>

<script>
import JudgerAPI from "../js/judgerAPI.js";

export default {
  data() {
    return {
      isoCountries: { AF: "Afghanistan", AX: "Aland Islands", AL: "Albania", DZ: "Algeria", AS: "American Samoa", AD: "Andorra", AO: "Angola", AI: "Anguilla", AQ: "Antarctica", AG: "Antigua And Barbuda", AR: "Argentina", AM: "Armenia", AW: "Aruba", AU: "Australia", AT: "Austria", AZ: "Azerbaijan", BS: "Bahamas", BH: "Bahrain", BD: "Bangladesh", BB: "Barbados", BY: "Belarus", BE: "Belgium", BZ: "Belize", BJ: "Benin", BM: "Bermuda", BT: "Bhutan", BO: "Bolivia", BA: "Bosnia And Herzegovina", BW: "Botswana", BV: "Bouvet Island", BR: "Brazil", IO: "British Indian Ocean Territory", BN: "Brunei Darussalam", BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi", KH: "Cambodia", CM: "Cameroon", CA: "Canada", CV: "Cape Verde", KY: "Cayman Islands", CF: "Central African Republic", TD: "Chad", CL: "Chile", CN: "China", CX: "Christmas Island", CC: "Cocos (Keeling) Islands", CO: "Colombia", KM: "Comoros", CG: "Congo", CD: "Congo, Democratic Republic", CK: "Cook Islands", CR: "Costa Rica", CI: "Cote D'Ivoire", HR: "Croatia", CU: "Cuba", CY: "Cyprus", CZ: "Czech Republic", DK: "Denmark", DJ: "Djibouti", DM: "Dominica", DO: "Dominican Republic", EC: "Ecuador", EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea", EE: "Estonia", ET: "Ethiopia", FK: "Falkland Islands (Malvinas)", FO: "Faroe Islands", FJ: "Fiji", FI: "Finland", FR: "France", GF: "French Guiana", PF: "French Polynesia", TF: "French Southern Territories", GA: "Gabon", GM: "Gambia", GE: "Georgia", DE: "Germany", GH: "Ghana", GI: "Gibraltar", GR: "Greece", GL: "Greenland", GD: "Grenada", GP: "Guadeloupe", GU: "Guam", GT: "Guatemala", GG: "Guernsey", GN: "Guinea", GW: "Guinea-Bissau", GY: "Guyana", HT: "Haiti", HM: "Heard Island & Mcdonald Islands", VA: "Holy See (Vatican City State)", HN: "Honduras", HK: "Hong Kong", HU: "Hungary", IS: "Iceland", IN: "India", ID: "Indonesia", IR: "Iran, Islamic Republic Of", IQ: "Iraq", IE: "Ireland", IM: "Isle Of Man", IL: "Israel", IT: "Italy", JM: "Jamaica", JP: "Japan", JE: "Jersey", JO: "Jordan", KZ: "Kazakhstan", KE: "Kenya", KI: "Kiribati", KR: "Korea", KW: "Kuwait", KG: "Kyrgyzstan", LA: "Lao People's Democratic Republic", LV: "Latvia", LB: "Lebanon", LS: "Lesotho", LR: "Liberia", LY: "Libyan Arab Jamahiriya", LI: "Liechtenstein", LT: "Lithuania", LU: "Luxembourg", MO: "Macao", MK: "Macedonia", MG: "Madagascar", MW: "Malawi", MY: "Malaysia", MV: "Maldives", ML: "Mali", MT: "Malta", MH: "Marshall Islands", MQ: "Martinique", MR: "Mauritania", MU: "Mauritius", YT: "Mayotte", MX: "Mexico", FM: "Micronesia, Federated States Of", MD: "Moldova", MC: "Monaco", MN: "Mongolia", ME: "Montenegro", MS: "Montserrat", MA: "Morocco", MZ: "Mozambique", MM: "Myanmar", NA: "Namibia", NR: "Nauru", NP: "Nepal", NL: "Netherlands", AN: "Netherlands Antilles", NC: "New Caledonia", NZ: "New Zealand", NI: "Nicaragua", NE: "Niger", NG: "Nigeria", NU: "Niue", NF: "Norfolk Island", MP: "Northern Mariana Islands", NO: "Norway", OM: "Oman", PK: "Pakistan", PW: "Palau", PS: "Palestinian Territory, Occupied", PA: "Panama", PG: "Papua New Guinea", PY: "Paraguay", PE: "Peru", PH: "Philippines", PN: "Pitcairn", PL: "Poland", PT: "Portugal", PR: "Puerto Rico", QA: "Qatar", RE: "Reunion", RO: "Romania", RU: "Russian Federation", RW: "Rwanda", BL: "Saint Barthelemy", SH: "Saint Helena", KN: "Saint Kitts And Nevis", LC: "Saint Lucia", MF: "Saint Martin", PM: "Saint Pierre And Miquelon", VC: "Saint Vincent And Grenadines", WS: "Samoa", SM: "San Marino", ST: "Sao Tome And Principe", SA: "Saudi Arabia", SN: "Senegal", RS: "Serbia", SC: "Seychelles", SL: "Sierra Leone", SG: "Singapore", SK: "Slovakia", SI: "Slovenia", SB: "Solomon Islands", SO: "Somalia", ZA: "South Africa", GS: "South Georgia And Sandwich Isl.", ES: "Spain", LK: "Sri Lanka", SD: "Sudan", SR: "Suriname", SJ: "Svalbard And Jan Mayen", SZ: "Swaziland", SE: "Sweden", CH: "Switzerland", SY: "Syrian Arab Republic", TW: "Taiwan", TJ: "Tajikistan", TZ: "Tanzania", TH: "Thailand", TL: "Timor-Leste", TG: "Togo", TK: "Tokelau", TO: "Tonga", TT: "Trinidad And Tobago", TN: "Tunisia", TR: "Turkey", TM: "Turkmenistan", TC: "Turks And Caicos Islands", TV: "Tuvalu", UG: "Uganda", UA: "Ukraine", AE: "United Arab Emirates", GB: "United Kingdom", US: "United States", UM: "United States Outlying Islands", UY: "Uruguay", UZ: "Uzbekistan", VU: "Vanuatu", VE: "Venezuela", VN: "Viet Nam", VG: "Virgin Islands, British", VI: "Virgin Islands, U.S.", WF: "Wallis And Futuna", EH: "Western Sahara", YE: "Yemen", ZM: "Zambia", ZW: "Zimbabwe", },
      showText: false,
      name: "",
      dataLoading: false,
      person: {
        name: "",
        age: 0,
        gender: "",
        nation: "",
        nationPercentage: "",
        secondNationPercentage: "",
        thirdNationPercentage: "",
        secondNation: "",
        thirdNation: "",
      },
    };
  },

  methods: {
    getCountryName(countryCode) {
      if (this.isoCountries.hasOwnProperty(countryCode)) {
        return this.isoCountries[countryCode];
      } else {
        return countryCode;
      }
    },

    nameUpdater() {
      this.person.name = this.name;
    },

    getData() {
      this.dataLoading = true;

      (this.person = {
        name: "",
        age: "",
        nation: "",
      }),
        this.judgerAPI.getNation(this.name.toLowerCase()).then((nation) => {
          console.log(nation);
          this.person.nation = this.getCountryName(
            nation.country[0]?.country_id
          );
          this.person.secondNation = this.getCountryName(
            nation?.country[1]?.country_id
          );
          this.person.thirdNation = this.getCountryName(
            nation?.country[2]?.country_id
          );
          this.person.nationPercentage = Math.round(
            this.getCountryName(nation?.country[0]?.probability) * 100
          );
          this.person.secondNationPercentage = Math.round(
            this.getCountryName(nation?.country[1]?.probability) * 100
          );
          this.person.thirdNationPercentage = Math.round(
            this.getCountryName(nation?.country[2]?.probability) * 100
          );
        });

      this.judgerAPI.getAge(this.name.toLowerCase()).then((age) => {
        console.log(age);
        this.person.age = age.age;
      });

      this.judgerAPI.getGender(this.name.toLowerCase()).then((gender) => {
        console.log(gender);
        this.person.gender = gender.gender;
        this.dataLoading = false;
        this.showText = true;
      });

      this.person.name = this.name;
      
    },
  },

  mounted() {
    this.judgerAPI = new JudgerAPI();
  },
};
</script>

<style>


.center-vertical {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 10px;
}
</style>