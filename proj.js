var datapromise = d3.csv("masterdatasheet.csv")

datapromise.then(
function (alldata)
{
        get1popperc(alldata)
    
    console.log((alldata), "coolbeans")
    setup(alldata)
    getAllpopperc(alldata)
 
},

 function(err)
    {
        console.log("nope", err)
       
    }
)


var get1popperc = function (alldata)
{
    console.log(alldata[8].changetotalpop)

    return alldata[0].changetotalpop
}

var getAllpopperc = function (alldata)
{
    console.log("good", alldata.map(get1popperc))
    return alldata.map(get1popperc)
}


var screen = {width: 800, height: 500}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg")



var setup = function (array2D)
{
    console.log(array2D)
    d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .attr("id", "graph")
        .attr("transform", "translate(" + margins.left + ","+margins.top+")");
    
    var width= screen.width - margins.left-margins.right;
    var height = screen.height - margins.top - margins.bottom;

    
    var xScale = d3.scaleLinear()
        .domain([1983,2018])
        .range([0,width])
    
    var yScale = d3.scaleLinear()
        .domain([-3,3])
        .range([height, 0])
    
    /*var zScale = d3.scaleLinear()
        .domain([7500,41000])
        .range([height, 0])
    
    var aScale = d3.scaleLinear()
        .domain([10,35])
        .range([height,0])*/
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    
    d3.select("svg")
        .append("g")
        .classed("axis", true)
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate(" + margins.left + "," + (margins.top+height) + ")")
        .call(xAxis)
    
      d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(25," + margins.top + ")")
        .call(yAxis)
    
    
    drawlines(getAllpopperc)

}



var drawlines = function(alldata, xScale, yScale, Cscale, array)
    {
        
    var arrays = d3.select("#graph")
    .selectAll("g")
    .data(alldata)
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)  
    
    
    var lineGenerator = d3.line()
    
     var lineGenerator = d3.line()
        .x(function(quizes){return alldata.year})
        .y(function(quizes){return alldata.changetotalpop})
        .curve(d3.curveNatural)
    
    arrays.append("path")
    .datum(array)
    .attr("d", lineGenerator);        
    }












