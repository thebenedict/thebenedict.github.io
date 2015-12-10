var data;

var myChart;
var electionDay = 1445720400000;
var electionPx;

var colors = {
  "Citizen": "#0072bc",
  "Mwananchi": "#529ecf",

  "Guardian": "#9FCA3C",
  "Nipashe": "#c2de81",

  "Daily News": "#b02334",
  "Habarileo": "#ba5763",
}

var chartWrapper = "#chart-wrapper"

var publicationColors = function (d, i) {
    return colors[d.key];
}

var createChart = function(term, counts) {
  var cid = term.toLowerCase() + "-chart";

  $(chartWrapper).empty();
  addChartContainer(cid);

  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .showControls(false);
    
    chart.stacked(true);

    chart.xAxis
      .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

    var formatter = d3.format('d');
    chart.yAxis
      .axisLabel('Count (' + term + ')')
      .tickFormat(function (d) { 
        if (d < 0) d = -d; // No negative labels
        return formatter(d);
    });

    chart.color(publicationColors);
    chart.legend.vers('furious');
    chart.legend.width(400);

    d3.select('#' + cid + ' svg')
      .datum(counts)
      .transition().duration(350)
      .call(chart);

    nv.utils.windowResize(chart.update);

    election = chart.xAxis.scale().domain().indexOf(electionDay);
    electionPx = chart.xAxis.scale().range()[election] + 65;
    myChart = chart;
    return chart;
  });
}

var addChartContainer = function(cid) {
  $( '<div id="' + cid + '" class="chart"><svg></svg></div>' ).appendTo( chartWrapper );
}

d3.json("/data/counts.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;

  $(".select-wrapper").show();
  $(".table-compressed").hide();

  $(document).change("#chart-select", function() {
    term =  $("#chart-select").val();
    createChart(term, data[term]);
  });

  $(document).change("#table-select", function() {
    $(".table-compressed").hide();
    $("#" + $("#table-select").val()).show();
  });

  $("#nation").show();
  createChart("magufuli-magufuli", data["magufuli-magufuli"]);
});