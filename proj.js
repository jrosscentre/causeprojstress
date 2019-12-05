

var screen = {width: 800, height: 500}
var margins = {top: 10, right: 50, bottom: 50, left:70}

var svg = d3.select("svg")



var setup = function (array2D)
{
    console.log(array2D)
  var svg = d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .attr("id", "graph")
        .attr("transform", "translate(" + margins.left + ","+margins.top+")");
    
    //d3.select("svg")
    //.append("svg")
    //.attr("width", screen.width)
    //.attr("width", screen.height)
    //.attr("transform", "translate(" + margins.left + ","+margins.top+")")
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", (margins.left-130))
    .attr("x", 0-(height/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Percentage")
    
    //d3.select("svg")
    //.append("svg")
    //.attr("width", screen.width)
    //.attr("width", screen.height)
    //.attr("transform", "translate(" + margins.left + ","+margins.top+")")
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+(height/2)+")")
    .text("Year")

    
    d3.select("svg")
    .append("svg")
    .attr("width", screen.width)
    .attr("width", screen.height)
    .attr("transform", "translate(" + margins.left + ","+margins.top+")")
 

    
    
    var width= screen.width - margins.left-margins.right;
    var height = screen.height - margins.top - margins.bottom;

    
    var xScale = d3.scaleLinear()
        .domain([1983,2018])
        .range([0,width])
    
    var yScaleperc = d3.scaleLinear()
        .domain([0,120])
        .range([height, 0])
    var yScalepopperc = d3.scaleLinear()
        .domain([10, 70])
        .range([height, 0])
    var yScaletuit = d3.scaleLinear()
        .domain([7500, 40000])
        .range([height, 0])
    var yScalepss = d3.scaleLinear()
        .domain ([10, 32])
        .range([height, 0])
    
    
    
    /*var zScale = d3.scaleLinear()
        .domain([7500,41000])
        .range([height, 0])
    
    var aScale = d3.scaleLinear()
        .domain([10,35])
        .range([height,0])*/
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScaleperc)
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    
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
        .attr("transform", "translate("+margins.left+"," + margins.top + ")")
        .call(yAxis)
    
    
    
    /* d3.select("svg")
    .apppend("svg:svg")
    .attr("width", width)
    .attr("height",height)
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+(padding/2)+","+(height/2)+")rotate(-90)")
//    .text("Percent Change")*/
    
    
   drawLegend(array2D, cScale)
    
    drawline(array2D, xScale, yScaleperc, cScale, "changetotalpop")
    //drawline(array2D, xScale, yScaleperc, cScale, "changetuitionpriv")
    //drawline(array2D, xScale, yScaleperc, cScale, "changetuitionpub")
    drawline(array2D, xScale, yScaleperc, cScale, "changetuition")
    drawline(array2D, xScale, yScaleperc, cScale, "changepss")
    
   
  
       
    
    
    
    d3.select("#pss")
    .on("click" , function ()
        {
           d3.selectAll("#graph")
           .selectAll("g")
           .remove()
           d3.selectAll("#legend")
           .selectAll("g")
           .remove()
        
        d3.selectAll("#yAxis")
        .selectAll("g")
        .remove()
        
        var yScalepss = d3.scaleLinear()
        .domain ([10, 32])
        .range([height, 0])
        
        var yAxis = d3.axisLeft(yScalepss)
        d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate("+margins.left+"," + margins.top + ")")
        .call(yAxis)
           
           drawline(array2D, xScale, yScalepss, cScale, "PSSscore")
        var legendArraypss = [{name: "PSS score", index:"PSSscore"}]
        drawLegend(legendArraypss, cScale)
       })
    
    
    d3.select("#tuitionprice")
    .on("click", function ()
        {
        d3.selectAll("#graph")
        .selectAll("g")
        .remove()
        d3.selectAll("#legend")
        .selectAll("g")
        .remove()
        
        d3.selectAll("#yAxis")
        .selectAll("g")
        .remove()
        
        var yScaletuit = d3.scaleLinear()
        .domain([7500, 40000])
        .range([height, 0])
        
        var yAxis = d3.axisLeft(yScaletuit)
        d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate("+margins.left+"," + margins.top + ")")
        .call(yAxis)
        
        
        
        
        drawline(array2D, xScale, yScaletuit, cScale, "tuitionprices(public)")
        drawline(array2D, xScale, yScaletuit, cScale, "tuitionprices(private)")
        drawline(array2D, xScale, yScaletuit, cScale, "avgtuitioprice")
        
        var legendArraytuition = [{name: "public college tuition prices", index:"tuitionprices(public)"},{name:"private college tuition prices", index: "tuitionprices(private)"},{name:"average tuition prices", index:"avgtuitioprice"}]
         
        drawLegend(legendArraytuition, cScale)
    })
  
    
    
  d3.select("#totalpopact")
       .on("click", function ()
           {
 
       d3.selectAll("#graph")
      .selectAll("g")
       .remove()
        d3.selectAll("#legend")
        .selectAll("g")
        .remove()
      
       d3.selectAll("#yAxis")
        .selectAll("g")
        .remove()
        
      var yScaleperc = d3.scaleLinear()
        .domain([0,120])
        .range([height, 0])
        
        var yAxis = d3.axisLeft(yScaleperc)
        
        d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate("+margins.left+"," + margins.top + ")")
        .call(yAxis)
      
      var legendArraypopperc = [{name:"population percentage with degree", index:"totalpopulationpercentagewithdegree"}, {name:"female population percentage", index:"female"}, {name:"male population percentage", index:"male"}]
       
       drawline(array2D, xScale, yScalepopperc, cScale,  "totalpopulationpercentagewithdegree")
      drawline(array2D, xScale, yScalepopperc, cScale, "female")
      drawline(array2D, xScale, yScalepopperc, cScale, "male")
   
      
       drawLegend(legendArraypopperc, cScale)  
  })
    
    
             d3.select("#origperc")
    .on("click" , function (array, index)
        {
           
           console.log(array)
                 
            var legendArrayperc = [{name:"total population percent change", index:"changetotalpop"}, {name:"tuition price percent change", index:"changetuition"}, {name:"PSS(percieved stress scale) percent change", index:"changepss"}]
    
           
           d3.selectAll("#graph")
           .selectAll("g")
           .remove()
           d3.selectAll("#legend")
           .selectAll("g")
           .remove()
        
        d3.selectAll("#yAxis")
        .selectAll("g")
        .remove()
        d3.selectAll()
        
      var yScaleperc = d3.scaleLinear()
        .domain([0,120])
        .range([height, 0])
        
        var yAxis = d3.axisLeft(yScaleperc)
        
        d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate("+margins.left+"," + margins.top + ")")
        .call(yAxis)
                 
           drawline(array2D, xScale, yScaleperc, cScale, "changetotalpop")
        drawline(array2D, xScale, yScaleperc, cScale, "changetuition")
    drawline(array2D, xScale, yScaleperc, cScale, "changepss")
           
         drawLegend(legendArrayperc, cScale)   
         
       
   })
        
            //d3.select("#tooltip").classed("hidden", true)
           
           
           
           
           /*(array2D, xScale, yScale, "total population percentage with degree")*/
         
    //drawlineact(array2D, xScale, yScale, "total population percentage with degree")

}


var drawline = function(alldata, xScale, yScale, cScale, array)
{  
    var arrays = d3.select("#graph")
       // .selectAll("g")
        //.data(alldata)
    // .enter()
        
        .append("g")
        .attr("fill", "none")
        .attr("stroke", function(d){return cScale(array)})
        .attr("stroke-width", 5)  
    
    var lineGenerator = d3.line()
        .x(function(data){return xScale(data.year)})
        .y(function(data){return yScale(data[array])})
       .curve(d3.curveCardinal.tension(0.5))
    
    arrays.append("path")
        .datum(alldata)
        .attr("d", lineGenerator)
    
    
    .on("mouseover", function()
            {
                svg.selectAll("#info")  
                    .remove()
            
                d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY + 28) + "px")
                    //.attr("color", "red")
                    .text("cool")
                    .classed("hidden", false)
            })
        .on("mouseout",function(){
            d3.select("#tooltip").classed("hidden",true)
        })
        //.on("mouseover", "red")
    
}



var drawLegend = function (legarray, cScale)
{
    d3.select("svg")
    .append("g")
    .attr("id","legend")
    .attr("transform","translate("+(screen.width-margins.right)+","+(margins.top)+")");
    
    var gs = d3.select("#legend")
    .selectAll("g")
    .data(legarray)
    .enter()
    .append("g")
    .attr("transform", function(arr,i)
         {
        return "translate(0, "+i*30+")";
    })
    
gs.append("rect").attr("width", 50).attr("height",20)
    .attr("fill", function (arr)
          {
    return cScale(arr.index)
})
    
    
    gs.append("text")
    .text(function(arr){return arr.name})
    .attr("x", 15)
    .attr("y", 10)
    //.attr("fill", "black")
}




var datapromise = d3.csv("masterdatayessirsheet.csv")

datapromise.then(
function (alldata)
{
    
      
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














