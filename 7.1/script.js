console.log('7.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:200,b:50,l:200};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;

var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    
var permit=plot.append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .attr('class','permit')
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');



var scaleX, scaleY,PermitBy,scaleColor,scaleXaverage;

//Step 1: importing multiple datasets
var scaleColor = d3.scaleOrdinal()
        .domain(['boston','south boston','charlestown','dorchester','jamaica plain','roxbury','allston','brighton','chestunt hill','east boston','hyde park','mattapan','mission hill','roslindale','west roxbury'])
        .range(['#86C166','#7BA23F','#4A593D','#42602D','#516E41','#91B493','#808F7C','#1B813E','#5DAC81','#36563C','#227D51','#A8D8B9','#6A8372','#2D6D4B','#24936E']);

d3.queue()
    .defer(d3.csv,'../data/Approved_Building_Permits.csv',parse)
    


    .await(function(err,permits,town){

    //console.table(permits);


    PermitBy = d3.nest()
    .key(function(d){return d. Permit})
    .rollup(function(values){return {"number":values.length,"average":d3.mean(values, function(d){return d.price}),"town":values}})
    .entries(permits)
    //console.table(PermitBy);
    /*PriceBy = d3.nest()
    .key(function(d){return d. price})
    .rollup(function(values){return values.length;})
    .entries(permits)*/
    draw(PermitBy)
        //Step 2: implement the code to switch between three datasets
        d3.select('#Permit-type').on('click', function(){
        	    
        d3.selectAll('.city').remove();
            
            draw(PermitBy)});
       		 //d3.select('.permit').attr('display','block');

    });

//Step 3: implement the enter / exit / update pattern
function cricle(town){

    d3.selectAll('.axis').remove();
    d3.selectAll('.qq').remove();
    d3.select('img').remove();

    plot.append('img')
        .attr('src','image/key2.png')
        

    townBy = d3.nest()
    .key(function(d){return d.town})
    .entries(town)
 console.table(townBy)
 var scaleR = d3.scaleLinear()
 .range([20,80]).domain(d3.extent(townBy,function(d){return d.values.length}))
var collide=d3.forceCollide().radius(function(d){return scaleR(d.values.length+5)}),
 forceY=d3.forceY().y(h/2),
 forceX=d3.forceX().x(w/2);
 var update=permit.selectAll('.city')
 .data(townBy,function(d){return d.values.town} )

 var enter=update.enter()
        .append('g')
        .attr('class','city');
        enter.append('circle')
        .attr('r',function(d){return scaleR(d.values.length)})   
        .style('fill',function(d){return scaleColor(d.key)})
        .html(function(d){
            return d.key;
        })
   .on('mouseenter',function(d){

            var tooltip = d3.select('.custom-tooltip');
            console.log("mouseenter", tooltip.node());
            tooltip.select('.title')
                .html(d.key);
            tooltip.transition().style('opacity',1);

            d3.select(this).style('stroke-width','3px');
        })
        .on('mousemove',function(d){
            var tooltip = d3.select('.custom-tooltip');
            var xy = d3.mouse( d3.select('.container').node() );
            tooltip
                .style('left',xy[0]-80+'px')
                .style('top',xy[1]-80+'px');
        })
        .on('mouseleave',function(d){
            var tooltip = d3.select('.custom-tooltip');
             tooltip.transition().style('opacity',0);

            d3.select(this).style('stroke-width','0px');
            });
              
update.exit().remove()
var simulation=d3.forceSimulation(townBy)
    .force('positionX',forceX)
    .force('positionY',forceY)
    .force('collide',collide)
    .on('tick',function(){
        permit.selectAll('.city')
        .attr('transform',function(d){return 'translate('+d.x+','+d.y+')'})

    })
}

function draw(rows){
   d3.select('img').remove();

    plot.append('img')
        .attr('src','image/key.png')
         maxX=d3.max(rows,function(d){return d.value.number}),
         maxXaverage=d3.max(rows,function(d){return d.value.average}),
         console.log(maxXaverage)
        scaleY = d3.scaleLinear()
            .domain([0,13])
            .range([h-30,0]);
        scaleX = d3.scaleLinear()
            .domain([0,maxX])
            .range([0,w]);
        scaleXaverage = d3.scaleLinear()
            .domain([0,maxXaverage])
            .range([0,w]);    

        var axisX = d3.axisBottom()
            .scale(scaleX)
            //.tickSize(-w-200);

        permit.append('g')
            .attr('class','axis axis-x')
            .attr('transform','translate(0,'+h+')')
            .call(axisX)
        var axisY = d3.axisLeft()
            .scale(scaleY)
    //update set
    var update = permit.selectAll('.qq')
    .data(rows, function(d){return d.key});
    //enter
    var enter = update.enter()
    .append('g')
    .attr('class','qq')
    
    
    enter.append('rect')
    .attr('class','number')
    .attr('x',0)
    .attr('width',15)
    .style('fill','#F7C242')
    enter.append('text')
    .attr('text-anchor','middle');

    enter.append('rect')
    .attr('class','average')
    .attr('x',0)
    .attr('width',15)
    .style('fill','#ED784A')
    .attr('y',15);

    //Exit
     update.exit().remove()
var bb = update
.merge(enter)
.attr('transform',function(d,i){
        return 'translate(0,'+scaleY(i)+')';
    })
bb.select('.number')
    .attr('y',0)
    .attr('x',0)
    .attr('height',10)
    .transition().duration(1000)
    .attr('width',function(d){
        return scaleX(d.value.number);
    });
bb.select('.average')
    .attr('y',10)
    .attr('x',0)
    .attr('height',10)
    .transition().duration(1000)
    .attr('width',function(d){
        
        return scaleXaverage(d.value.average);
    });

    bb.select('text')
    .text(function(d){return d.key})
    .attr('y',8.5)
    .attr('x',-10)
    .attr('text-anchor','end')
    .on('mouseenter',function(d){
        d3.select(this)
          .style('fill','#3CB4BE');
    })
    .on('click',function(d){
        cricle(d.value.town)})
    .on('mouseleave',function(d){ 
          d3.select(this)
            .style('fill','#FCFAF2');});

}




function parse(d){
    if(!d.CITY){return}
    return {
        Permit: d.PermitTypeDescr,
        town:d.CITY.toLowerCase(),
        price:+d.DECLARED_VALUATION.slice(1),
        
    }
}
