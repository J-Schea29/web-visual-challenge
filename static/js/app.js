function buildMetaData(sample) {
  d3.json("samples.json").then(function(data) {
    var metaData = data.metadata;
      console.log(metaData)
    var resultArray = metaData.filter(function(data){
      return data.id === sample;
    })
    console.log(resultArray);
  })
}

function buildCharts(sample) {
  d3.json("samples.json").then(function(data) {
    var samples = data.samples;
    var resultArray = samples.filter(function(data){
      return data.id === sample;
      var otu_ids = resultArray.otu_ids;
      var otu_labels = resultArray.otu_labels;
      var sample_values = resultArray.sample_values;
    })
    console.log(resultArray);
  })
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
     buildMetaData(firstSample)
     buildCharts(firstSample);
  })
}


init()




// Sort the data by Greek search results descending
let sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// Slice the first 10 objects for plotting
slicedData = sortedByGreekSearch.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

let trace1 = {
  x: reversedData.map(object => object.greekSearchResults),
  y: reversedData.map(object => object.greekName),
  text: reversedData.map(object => object.greekName),
  name: "Greek",
  type: "bar",
  orientation: "h"
};

let layout = {
  title: "Greek gods search results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

Plotly.newPlot("plot", traceData, layout);
