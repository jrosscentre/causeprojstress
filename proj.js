

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
    
    var yScaleperc = d3.scaleLinear()
        .domain([0,120])
        .range([height, 0])
    var yScalepopperc = d3.scaleLinear()
        .domain([35, 70])
        .range([height, 0])
    var yScaletuit = d3.scaleLinear()
        .domain([7500, 40000])
        .range([height, 0])
    var yScalepss = d3.scaleLinear()
        .domain ([10, 32])
        .range([height, 0])
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    /*var zScale = d3.scaleLinear()
        .domain([7500,41000])
        .range([height, 0])
    
    var aScale = d3.scaleLinear()
        .domain([10,35])
        .range([height,0])*/
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScaleperc, yScaletuit)
    
    
    d3.select("svg")
        .append("g")
        .classed("axis", true)
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")  
        .attr("transform", "translate(" + margins.left + "," + (margins.top+height) + ")")
        .call(xAxis)
    
    /*.append("text")
    .attr("text-anchor", "middle")
    .text("percentage")
        .call(xAxis)*/
    
   /* d3.select(".axis")
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+(padding/2)+","+(height/2)+")rotate(-90)")
    .text("Year")*/
    
    
      d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(25," + margins.top + ")")
        .call(yAxis)
    /* d3.select("svg")
    .apppend("svg:svg")
    .attr("width", width)
    .attr("height",height)
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+(padding/2)+","+(height/2)+")rotate(-90)")
//    .text("Percent Change")*/
    
    
    drawLengend(array2D, cScale)
    
    drawline(array2D, xScale, yScaleperc, "changetotalpop")
    drawline(array2D, xScale, yScaleperc, "changetuitionpriv")
    drawline(array2D, xScale, yScaleperc, "changetuitionpub")
    drawline(array2D, xScale, yScaleperc, "changepss")
    
       d3.select("#origperc")
    .on("click" , function ()
        {
           d3.selectAll("#graph")
           .selectAll("g")
           .remove()
           
           drawline(array2D, xScale, yScaleperc, "changetotalpop")
    drawline(array2D, xScale, yScaleperc, "changetuitionpriv")
    drawline(array2D, xScale, yScaleperc, "changetuitionpub")
    drawline(array2D, xScale, yScaleperc, "changepss")
       })
    
    
    
    d3.select("#pss")
    .on("click" , function ()
        {
           d3.selectAll("#graph")
           .selectAll("g")
           .remove()
           
           drawline(array2D, xScale, yScalepss, "PSSscore")
       })
    
    
    d3.select("#tuitionprice")
    .on("click", function ()
        {
        d3.selectAll("#graph")
        .selectAll("g")
        .remove()
        
        drawline(array2D, xScale, yScaletuit, "tuitionprices(public)")
        drawline(array2D, xScale, yScaletuit, "tuitionprices(private)")
    })
       
    
    
    
  d3.select("#totalpopact")
       .on("click", function ()
           {
 
       d3.selectAll("#graph")
      .selectAll("g")
       .remove()
       
       drawline(array2D, xScale, yScalepopperc, "totalpopulationpercentagewithdegree")
       
   })

            
        
            //d3.select("#tooltip").classed("hidden", true)
           
           
           
           
           /*(array2D, xScale, yScale, "total population percentage with degree")*/
         
    //drawlineact(array2D, xScale, yScale, "total population percentage with degree")

}


var drawline = function(alldata, xScale, yScale, array)
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
        .y(function(data){return yScale(data[array])})
       .curve(d3.curveCardinal.tension(0.5))
    
    arrays.append("path")
        .datum(alldata)
        .attr("d", lineGenerator);      
}

/*var drawlineact = function (alldata, xScale, yScale, act)
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
}*/

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














