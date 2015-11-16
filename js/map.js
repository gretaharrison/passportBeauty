Element.prototype.Map = function() {
  var map = this;
  this.countries = {};



  this.connect = function () {
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./models/countries.json", true);
    xhr.setRequestHeader("Content-Type", "application/json");


    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
          var response = JSON.parse(xhr.responseText);
          that.countries = response.countries;

      }
    }
    xhr.send();
  };

  this.init = function() {
    this.connect();
    console.log(d3.select("path")); //this gives me the full svg DOM
    var svg = d3.select("#map svg");
    var countries = svg.selectAll("path");
    console.log(countries);


// CREATING THE POP UP BOX

    for(var i=0; i<countries.length; i++)(function(i){
      for(var j=0; j<countries[i].length; j++)(function(j){
        var country = countries[i][j];
        country.addEventListener('click', function(){

          console.log(map.countries[country.id]);
          var modal = document.getElementById('modal');
          modal.style.visibility = "visible";

          var displayNameText = map.countries[country.id].displayName;
          var displayName = document.createElement('displayName');
          displayName.innerHTML = displayNameText;

          var beautySolutionText = map.countries[country.id].beautySolution;
          var beautySolution = document.createElement('beautySolution');
          beautySolution.innerHTML = beautySolutionText;

          var solutionDescriptionText = map.countries[country.id].solutionDescription;
          var solutionDescription = document.createElement('solutionDescription');
          solutionDescription.innerHTML = solutionDescriptionText;

          var p = document.createElement('div');
          p.innerHTML = '<div class="name">'+displayNameText+'</div><div class="solution">'+beautySolutionText+'</div><div class="description">'+solutionDescriptionText+'</div>';
          modal.appendChild(p);

          var close = document.getElementById('close');
          close.addEventListener('click', function(){
            modal.style.visibility = "hidden";
            document.getElementById('p');
            p.innerHTML = '';
          });


          // var closeBack = document.getElementById('modalBackdrop');
          // closeBack.style.display = "block";
          // closeBack.addEventListener('click', function(){
          //   modal.style.visibility = "hidden";
          //   document.getElementById('p');
          //   p.innerHTML = '';
          // });

        });
      })(j)
    })(i);


  //  console.log(myCountries);
  }


  this.init();

};
