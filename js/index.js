(function(){

	const
		PREVIEW = 'preview',
		DESCRIPTION = 'textForFoto';

	var iconSearch = $('.iconSearch'),
		inputSearch = $('[data-role="search"]'),
		listFoto = $('.listFoto'),
		closeBigPhoto = $('.closeBigPhoto'),
		mainContainer = $('.container');

	$(iconSearch).click(function(event) {
		$(inputSearch).focus();
	});

	$(listFoto).click(function(event) {
		var target = event.target;

		if ( $(target).hasClass( PREVIEW ) || $(target).hasClass( DESCRIPTION ) ){

			$(target.parentElement).find('.descriptionFoto').show();
			$(mainContainer).css({
				'overflow' : 'hide'
			})
			return;
		}
	});

	$(closeBigPhoto).click(function(event) {
		var target = event.target;

		while( true ){

			if( $(target).hasClass('descriptionFoto') ){
				$(target).hide();
				return;
			} else {
				target = target.parentElement;
			}
		}
	});

})()