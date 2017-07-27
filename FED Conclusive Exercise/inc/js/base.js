"use strict";

(function() {
	
	var Carousel = {
		props:{
			current_slide:null,
			total_slides:null
		},
		init:function(){

			//ADD INITIALIZER CODE HERE

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
			//ADD NEXT CODE HERE
		},
		previous:function(){
			//ADD PREVIOUS CODE HERE
		},
		update:function(){
			//ADD UPDATE CODE HERE
		}
	}
	$(function(){
		Carousel.init();
	})

})(window);