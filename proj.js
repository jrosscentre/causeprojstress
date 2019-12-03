

var screen = {width: 1000, height: 500}
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
        .domain([-20,130])
        .range([height, 0])
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
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
    
   /* d3.select("#buttons")
    .selectAll("button")
    .data(array2D)
    .enter()
    .append("button")
    .text(function(array2D)
    { 
        console.log(array2D)
        
        return d.columns 
    })*/
    
    drawLengend(array2D, cScale)
    
    drawlineperc(array2D, xScale, yScale, "changetotalpop")
    drawlineperc(array2D, xScale, yScale, "changetuitionpriv")
    drawlineperc(array2D, xScale, yScale, "changetuitionpub")
    drawlineperc(array2D, xScale, yScale, "changepss")
    
   d3.select("#totalpopact")
    //click
       .on("click", function (funcactdata)
           {
       console.log(funcactdata)
       drawlineact(funcactdata, xScale, yScale, "totalpopulationpercentagewithdegree")
       
   })
            
        
            //d3.select("#tooltip").classed("hidden", true)
           
           
           
           
           /*(array2D, xScale, yScale, "total population percentage with degree")*/
         
    //drawlineact(array2D, xScale, yScale, "total population percentage with degree")
    
            
   // drawline(getAlltuitprivperc(array2D))
   // drawline(getAlltuitpubperc(array2D))
   // drawline(getAllpssperc(array2D))

}


var drawlineperc = function(alldata, xScale, yScale, perc)
{  
    var arrays = d3.select("#graph")
       // .selectAll("g")
        //.data(alldata)
    // .enter()
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 5)  
    
    var lineGenerator = d3.line()
        .x(function(data){return xScale(data.year)})
        .y(function(data){return yScale(data[perc])})
       .curve(d3.curveCardinal.tension(0.5))
    
    arrays.append("path")
        .datum(alldata)
        .attr("d", lineGenerator);      
}

var drawlineact = function (alldata, xScale, yScale, act)
{
    var arrays = d3.select("#graph")
       // .selectAll("g")
        //.data(alldata)
    // .enter()
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 5)  
    
    var lineGenerator = d3.line()
        .x(function(data){return xScale(data.year)})
        .y(function(data){return yScale(data[act])})
       // .curve(d3.curveNatural)
    
    arrays.append("path")
        .datum(alldata)
        .attr("d", lineGenerator);  
}

var drawLengend = function (array2D, cScale)
{
    d3.select("svg")
    .append("g").attr("id","legend")
    .attr("transform","translate("+(screen.width-margins.right)+","+(margins.top)+")");
    var gs = d3.select("#legend")
    .selectAll("g")
    .data(array2D)
    .enter()
    .append("g")
    .attr("fill",function(arr)
         {
        return cScale(arr.name);
    })
    .attr("transform", function(arr,i)
         {
        return "translate(0, "+i*14+")";
    })
gs.append("rect").attr("width", 30).attr("height",10);
    
    gs.append("text")
    .text(function(arr){return arr.name})
    .attr("x", 15)
    .attr("y", 10)
    .attr("fill", "black")
}




var datapromise = d3.csv("masterdatayessirsheet.csv")

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


/*var get1popperc = function (data)
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


var get1pssperc = function (data)
{
    console.log(data.adjchangepss)

    return data.adjchangepss
}
var getAllpssperc = function (alldata)
{
    console.log("mappss")
    return alldata.map(get1pssperc)
}*/














