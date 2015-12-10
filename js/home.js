'use strict';

var t;
var s;

var appendBefore = function(txt) {
  var pos = $('.thebenedict').position();
  var before = jQuery('<span/>', {
      class: 'addon addon-before',
      text: txt
  }).appendTo('.thebenedict');
  $('.addon-before')
    .offset({ top: pos.top, left: pos.left - before.width()})
    .fadeIn(500); 
};

var appendAfter = function(txt) {
  var pos = $('.thebenedict').position();
  var baseWidth = $('.thebenedict').width();
  jQuery('<span/>', {
      class: 'addon addon-after',
      text: txt
  }).appendTo('.thebenedict');
  $('.addon-after').offset({ top: pos.top, left: pos.left + (baseWidth)}).fadeIn(500);  
};

var hideDotCom = function() {
  clearTimeout(t);
  $('.com').css('visibility', 'hidden');
};

var appendAddons = function(before, after) {
  hideDotCom();
  $('.addon').remove();
  if (before) { appendBefore(before); }
  if (after) { appendAfter(after); }
};

var init = function() {
  t = setTimeout(function() {
    if ($('.com').css('visibility') === 'hidden') {
      $('.com').css('visibility', 'visible').hide().fadeIn(1000);
    }
  }, 750);
};

$(function() {
  init();

  $('.contact-icon').mouseenter(function(e) {
    clearTimeout(t);
    s = setTimeout(function() {
      var before = $(e.target).data('before');
      var after = $(e.target).data('after');
      appendAddons(before, after);
    }, 150);
  });

  $('.contact-icon').mouseleave(function() {
    clearTimeout(s);
    $('.addon').fadeOut(500, function() {
      this.remove();
    }); 
    init();
  });

  $('.icon-envelope').click(function() {
    var name = 'thebenedict';
    var base = '@gmail.com?subject=hello!';
    window.location.href = ['mailto:', name, base].join('');
  });
});