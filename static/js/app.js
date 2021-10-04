function buildMetaData(sample) {
  alert("meta")
}

function buildCharts(sample) {
  alert("chart")
}

function init() {
  //select in index.html where you want subject id info
  var selector = d3.select("#selDataset");
  console.log(selector);
  //use d3 to gather json data
  d3.json("samples.json").then(function(data) {
     console.log(data);
     var names = data.names;

     names.forEach(function(name){
       selector
       .append("option")
       .text(name)
       .property("value", name)
     })

     var firstSample = names[0];
     console.log(firstSample);
  })
}


init()
