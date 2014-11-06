'use strict';

var appendBefore = function(txt) {
	var pos = $('.thebenedict').position();
	var before = jQuery('<div/>', {
	    class: 'addon addon-before',
	    text: txt
	}).appendTo('.thebenedict');
	$('.addon-before')
		.offset({ top: pos.top, left: pos.left - before.width()})
		.fadeIn();	
};

var appendAfter = function(txt) {
	var pos = $('.thebenedict').position();
	var baseWidth = $('.thebenedict').width();
	jQuery('<div/>', {
	    class: 'addon addon-after',
	    text: txt
	}).appendTo('.thebenedict');
	$('.addon-after').offset({ top: pos.top, left: pos.left + (baseWidth)}).fadeIn();	
};

var appendAddons = function(before, after) {
	$('.addon').remove();
	if (before) { appendBefore(before); }
	if (after) { appendAfter(after); }
};

$(function() {
	$('.contact-icon').mouseenter(function(e) {
		var before = $(e.target).data('before');
		var after = $(e.target).data('after');
		appendAddons(before, after);
	});

	$('.contact-icon').mouseleave(function() {
		$('.addon').fadeOut(500, function() {
			this.remove();
		});	
	});
});