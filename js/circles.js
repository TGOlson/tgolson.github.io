(function($) {

function Circles() {}

Circles.minInterval = 1000;
Circles.randomInterval = 1000;
Circles.color = d3.scale.category20c();
Circles.width = $(window).width() - 5;
Circles.height = $(window).height() - 5;
Circles.svg = null;

Circles.start = function(){
  this.setSvgCanvas();
  this.setClickEvents();
  this.setTimeEvents();
  this.setResizeEvents();
};

Circles.setSvgCanvas = function(width, height){
  this.svg = d3.select("body").append("svg")
  .attr("width", this.width)
  .attr("height", this.height);

  this.svg.append("rect")
  .attr("width", this.width)
  .attr("height", this.height);
};

Circles.setTimeEvents = function(){
  var _this = this,
    e = {
      clientX: this.width / 2,
      clientY: this.height / 2
    };

  setInterval( function(){
    _this.appendNewCircle(e);
  }, Math.random() * _this.randomInterval + _this.minInterval );
};

Circles.setClickEvents = function(keywordID){
  var _this = this;

  $('body').on('click', function(e){
    _this.appendNewCircle(e, true);
  });
};

Circles.setResizeEvents = function(){
  var _this = this;

  $(window).resize(function(){
    $('svg')[0].width.baseVal.value = $(window).width() - 5;
    $('svg')[0].height.baseVal.value = $(window).height() - 5;
    _this.width = $(window).width() - 5;
    _this.height = $(window).height() - 5;
  });
};

Circles.appendNewCircle = function(e, click){
  var xLoc,
    yLoc;

  if (click){
    xLoc = e.offsetX;
    yLoc = e.offsetY;
  } else {
    xLoc = Math.random() * this.width;
    yLoc = Math.random() * this.height;
  }

  this.svg.insert("circle", "rect")
  .attr("cx", xLoc)
  .attr("cy", yLoc)
  .attr("r", 40)
  .style("stroke", this.color(Math.floor( Math.random()*20 + 1 )))
  .style("stroke-opacity", 1)
  .style('fill', 'none')
  .transition()
  .duration( Math.random() * 2000 + 1000 )
  .ease(Math.sqrt)
  .attr("r", Math.random() * 100 + 100 )
  .style("stroke-opacity", 1e-6)
  .remove();
};

Circles.stop = function(){
  $('svg').remove();
};

$(Circles.start.bind(Circles));

window.Circles = Circles;

})(jQuery);
