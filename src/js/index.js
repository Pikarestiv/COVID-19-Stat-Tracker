import {headItems} from "./API_key.js";

(
    () => {
      document.getElementById("searchForm").addEventListener("submit",
      (event) => {
        let country = document.getElementById("searchCountry").value;
        let searchCountry = country.slice(1, country.length-1)

        //calling the search function
        fetchStats(searchCountry);
        //preventing the default action of the form
        event.preventDefault();
      }
    );
  }
  )();

    let fetchStats = (searchCountry) => {
      const url = `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${searchCountry}`;
      //Making the axios call
      axios.get(url, headItems)
      .then(response => {
          let results = response.data.data;
          let statusMessage = response.data.message;

          let lastUpdate;
          let countryName;
          let confirmedCases = 0;
          let deaths = 0;
          let recovered = 0;
          
          if (searchCountry == "Canada" || "US"){
            countryName = searchCountry;
            lastUpdate = results.covid19Stats[0].lastUpdate;
            for(let i in results.covid19Stats){
              confirmedCases += results.covid19Stats[i].confirmed;
              deaths += results.covid19Stats[i].deaths;
              recovered += results.covid19Stats[i].recovered;
            }
          }
          else {
          countryData = results.covid19Stats[results.covid19Stats.length-1];
          countryName = countryData.country;
          confirmedCases = countryData.confirmed;
          deaths = countryData.deaths;
          recovered = countryData.recovered;
          lastUpdate = countryData.lastUpdate;
        };

          let tablediv = document.getElementById("results");
          let table = document.getElementById("results_table");
          table.rows[0].cells[1].innerHTML = countryName!==""?`${countryName}`:`World Wide`;
          table.rows[1].cells[1].innerHTML = `${lastUpdate}`;
          table.rows[2].cells[1].innerHTML = `${confirmedCases}`;
          table.rows[3].cells[1].innerHTML = `${recovered}`;
          table.rows[4].cells[1].innerHTML = `${deaths}`;
          tablediv.style.display = "block";
      })
      .catch(err => {
          alert(err);
      });
      
    };
    