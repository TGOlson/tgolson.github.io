(function($) {

function Circles() {}

Circles.generating = false;

Circles.intervalFactor = 1000;

Circles.color = d3.scale.category20c();

Circles.sizeFactor = 100;

Circles.windowWidth = null;
Circles.windowHeight = null;

Circles.svg = null;

Circles.start = function(){
  this.getWindowDimensions();
  this.setSvgCanvas();
  this.setClickEvents();
  this.setTimeEvents();
  this.setResizeEvents();

  this.generating = true;
};

Circles.getWindowDimensions = function() {
  this.windowWidth = $(window).width() - 5;
  this.windowHeight = $(window).height() - 5;
};

Circles.setSvgCanvas = function(width, height){
  this.svg = d3.select("body").append("svg")
    .attr("width", this.windowWidth)
    .attr("height", this.windowHeight);

  this.svg.append("rect")
    .attr("width", this.windowWidth)
    .attr("height", this.windowHeight);
};

Circles.setTimeEvents = function(){
  var _this = this;

  (function randomInterval() {

    setTimeout(function() {
      if(_this.generating) {
        _this.appendNewCircle();
      }

      // recursively call self to generate new random interval
      randomInterval();
    }, _this.getRandomInterval());

  })();
};

Circles.getRandomInterval = function() {
  return Math.random() * this.intervalFactor + this.intervalFactor;
};

Circles.setClickEvents = function(){
  $('body').click(this.appendNewCircle.bind(this));
};

// throttle this
Circles.setResizeEvents = function(){
  var _this = this;

  $(window).resize(function(){
    _throttle(500, function() {
      $('svg').width( $(window).width() - 5 );
      $('svg').height( $(window).height() - 5 );

      _this.getWindowDimensions();
    });
  });
};

Circles.appendNewCircle = function(e){
  var xLoc,
    yLoc;

  if (e){
    xLoc = e.clientX;
    yLoc = e.clientY;
  } else {
    xLoc = Math.random() * this.windowWidth;
    yLoc = Math.random() * this.windowHeight;
  }

  this.svg.insert("circle", "rect")
  .attr("cx", xLoc)
  .attr("cy", yLoc)
  .attr("r", 5)
  .style("stroke", this.color(Math.floor( Math.random()*20 + 1 )))
  .style("stroke-opacity", 1)
  .style('fill', 'none')
  .transition()
  .duration(Math.random() * 2000 + 1000)
  .ease(Math.sqrt)
  .attr("r", this.getSize())
  .style("stroke-opacity", 1e-6)
  .remove();
};

Circles.getSize = function() {
  return Math.random() * this.sizeFactor + this.sizeFactor;
};

Circles.larger = function() {
  this.sizeFactor += 10;
};

Circles.smaller = function() {
  var sizeFactor = this.sizeFactor - 10;
  if(sizeFactor > 0) this.sizeFactor = sizeFactor;
};

Circles.faster = function() {
  var intervalFactor = this.intervalFactor - 50;
  if(intervalFactor > 0) this.intervalFactor = intervalFactor;
};

Circles.slower = function() {
  this.intervalFactor += 50;
};

Circles.pause = function(){
  this.generating = false;
};

var _lastCall = null;

// naive throttle - throttles all calls, doesn't track functions
function _throttle(rate, callback) {

  // set time of last call if no calls have been made
  _lastCall = _lastCall || new Date();

  var now = new Date(),
    diff = now - _lastCall;

  if(diff > rate) {
    callback();
    _lastCall = new Date();
  }
}

$(Circles.start.bind(Circles));

window.Circles = Circles;

})(jQuery);
