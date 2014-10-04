$(function() {

  $('.circle-controls li').click(function(e) {
    var target = $(e.target),
      id = target.attr('id');

    Circles[id].call(Circles);

    if(id === 'pause') {
      target.text('>');
      target.attr({id: 'start'});
    } else if(id === 'start') {
      target.text('=');
      target.attr({id: 'pause'});
    }
  });


});

console.log('bleep blop bloop');
