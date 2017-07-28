"use strict";

(function() {

	var Carousel = {
		props:{
			current_slide:null,
			total_slides:null,
		},
		init:function(){
			this.props.total_slides = $(".slide-text");
			this.props.current_slide = 0;
			this.bindEvents();
		},
		bindEvents:function(){
			$(".carousel-next").on("click",function(){
				Carousel.next();
			});
			$(".carousel-prev").on("click",function(){
				Carousel.previous();
			});
		},
		next:function(){
			const prev = this.props.current_slide;
			const last = this.props.total_slides.length - 1;
			this.props.current_slide = prev === last ? 0 : prev + 1;
			this.update(prev, "next");
			// const $current = $(".slide-text").first().parent();
			// $(".slide-text").first().parent().remove();
			// $(".carousel-cells").append($current[0]);
			// this.update();
		},
		previous:function(){
			const prev = this.props.current_slide;
			const first = this.props.total_slides.length - 1;
			this.props.current_slide = prev === 0 ? first : prev - 1;
			this.update(prev, "previous");
			// const $current = $(".slide-text").last().parent();
			// $(".slide-text").last().parent().remove();
			// $(".slide-text").first().parent().before($current);
			// debugger
		},
		update:function(prev, type){
			$(".slide-text").addClass("hidden");
			$(".slide-text").slice(prev, prev + 1).attr("class", "slide-text " + type);
			$(".slide-text").slice(this.props.current_slide, this.props.current_slide + 1).attr("class", "slide-text current-" + type);

			// this.props.total_slides.addClass("hidden");
			// $(this.props.total_slides[this.props.current_slide]).attr("class", "slide-text");
		}
	}
	$(function(){
		Carousel.init();
	})

})(window);
