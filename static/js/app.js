function buildMetaData(sample) {
  d3.json("samples.json").then(function(data) {
    var metaData = data.metadata;
      console.log(metaData)
    var resultArray = metaData.filter(function(data){
      return data.id === sample;
    })
    console.log(resultArray);

    var personID = resultArray.id
    console.log(personID);
    var ethnicity = resultArray.ethnicity
    console.log(ethnicity);
    var gender = resultArray.gender
    console.log(gender);
    var age = resultArray.age
    console.log(age);
    var location = resultArray.location
    console.log(location);
    var bbtype = resultArray.bbtype
    console.log(bbtype);
    var wfreq = resultArray.wfreq
    console.log(wfreq);
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
    console.log(otu_ids)
    var otu_labels = result.otu_labels;
    console.log(otu_labels)
    var sample_values = result.sample_values;
    console.log(sample_values)

    var yticks = otu_ids.slice(0, 10).map(function(otuID) {
      return `OTU ${otuID}`;
    }).reverse();
    console.log(yticks)

    // Charts
    // Bar Chart
    let barLayout = {
      title: "Top 10 Bacteria Found",
      margin: {
        t:30, 
        l: 150,
      },

    };
    let barData = {
      y: yticks,
      x: sample_values.slice(0,10).reverse,
      text: otu_labels.slice(0,10).reverse,
      type: "bar",
      orientation: "h"
    };
    Plotly.newPlot("bar", barData, barLayout);
    // Bubble Chart
    var bubbleLayout = {
      title: "Bacteria Present in Subject",
      havermode: "closest",
      xaxis: { title: "OTU ID"},
      margin: {t: 30}
    };
    var bubbleData = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale:"Earth"
        },
    };
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  })
};

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


