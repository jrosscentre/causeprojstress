

var screen = {width: 800, height: 500}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg")



var setup = function (array2D,array)
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
        .domain([-3,85])
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
    
    
    drawlines(getAllpopperc(array2D))
    drawlines(getAlltuitprivperc(array2D))
    drawlines(getAlltuitpubperc(array2D))
    drawlines(getAllpss(array2D))

}


var drawlines = function(alldata, xScale, yScale, perc)
{  
    var arrays = d3.select("#graph")
        .selectAll("g")
        //.data(alldata)
    // .enter()
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 5)  
    
    var lineGenerator = d3.line()
        .x(function(){return alldata.year})
        .y(function(){return alldata.perc})
        .curve(d3.curveNatural)
    
    arrays.append("path")
        .datum(perc)
        .attr("d", lineGenerator);        
}



var get1popperc = function (data)
{
    console.log(data.changetotalpop)

    return data.changetotalpop
}
var getAllpopperc = function (alldata)
{
    console.log("maptotpop")
    return alldata.map(get1popperc)
}


var get1tuitprivperc = function (data)
{
    console.log(data.changetuitionpriv)

    return data.changetuitionpriv
}
var getAlltuitprivperc = function (alldata)
{
    console.log("maptuitpriv")
    return alldata.map(get1tuitprivperc)
}


var get1tuitpubperc = function (data)
{
    console.log(data.changetuitionpub)

    return data.changetuitionpub
}
var getAlltuitpubperc = function (alldata)
{
    console.log("maptuitpub")
    return alldata.map(get1tuitpubperc)
}


var get1tuitpubperc = function (data)
{
    console.log(data.changetuitionpub)

    return data.changetuitionpub
}
var getAlltuitpubperc = function (alldata)
{
    console.log("maptuitpub")
    return alldata.map(get1tuitpubperc)
}


var get1pss = function (data)
{
    console.log(data.changepss)

    return data.changepss
}
var getAllpss = function (alldata)
{
    console.log("mappss")
    return alldata.map(get1pss)
}



var datapromise = d3.csv("masterdatasheet.csv")

datapromise.then(
function (alldata)
{
    //get1popperc(alldata)
      
    console.log((alldata, "coolbeans"))
    
    setup(alldata)
    
 
},

 function(err)
    {
        console.log("nope", err)
       
    }
)











