function buildGauge(wfreq){
  console.log(wfreq)
}

function buildMetaData(sample) {
  d3.json("samples.json").then(function(data) {
    var metaData = data.metadata;
    var resultArray = metaData.filter(function(data){
      return data.id == sample;
    })
    var result = resultArray[0];
    var dataPanel = d3.select("#sample-metadata");
    dataPanel.html("");


    Object.entries(result).forEach(function([keys, value]){
      dataPanel.append("h6").text(` ${keys}: ${value} `);
    })
    buildGauge(result.wfreq)
  })
}

function buildCharts(sample) {
  d3.json("samples.json").then(function(data) {
    var samples = data.samples;
    var resultArray = samples.filter(function(data){
      return data.id === sample;
    })
    var result = resultArray[0]
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0, 10).map(function(otuID) {
      return `OTU ${otuID}`;
    }).reverse();

    var topTenSamples = sample_values.slice(0,10).reverse();
    var topTenLabels = otu_labels.slice(0,10).reverse();

    // Charts
    // Bar Chart
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        t:30, 
        l: 150,
      },
    };

    let barData = [{
      type: "bar",
      x: topTenSamples,
      y: yticks,
      text: topTenLabels,
      orientation: "h"
    }];

    Plotly.newPlot("bar", barData, barLayout);
    // Bubble Chart
    var bubbleLayout = {
      title: "Bacteria Cultures Present in Subject",
      havermode: "closest",
      xaxis: { title: "OTU ID"},
      margin: {t: 30}
    };
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,  
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:"Earth"
      },
    }];
 
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  })
};

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetaData(newSample);
}

function init() {
  //select in index.html where you want subject id info
  var selector = d3.select("#selDataset");
  console.log(selector);
  //use d3 to gather json data
  d3.json("samples.json").then(function(data) {
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


