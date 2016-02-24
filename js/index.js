(function(){

	var iconSearch = $('.iconSearch'),
		inputSearch = $('[data-role="search"]'),
		listFoto = $('.listFoto'),
		closeBigPhoto = $('.closeBigPhoto'),
		transparentLayer = $('.transparentLayer'),
		smallBlockMenu = $('.smallBlockMenu');

		//
		//  promise и setTimeout имитация
		//  обращения к серверу ( текст, фото ....  )
	var fakeStorage = (function () {

		var text = 'Lorem ipsum dolor sit amet'+
		'consectetur adipisicing elit, sed do'+
		'eiusmod tempor incididunt ut labore'+
		'et dolore magna aliqua. Ut enim ad'+
		'minim veniam, quis nostrud exercitation'+
		'ullamco laboris nisi ut aliquip ex ea'+
		'commodo consequat. Duis aute irure'+
		'dolor in reprehenderit in voluptate'+
		'velit esse cillum dolore eu fugiat'+
		'nulla pariatur. Excepteur sint occaecat'+
		'cupidatat non proident, sunt in culpa'+
		'qui officia deserunt mollit anim id est'+
		'laborum.';

		return{

			getDescription : function(){
				var defer = $.Deferred();

				setTimeout(function(){
					defer.resolve( text );
				}, 300);

				return defer.promise();
			}
		};

	})();

	$(closeBigPhoto).click(hideDescriptionFoto);
	$(transparentLayer).click(hideDescriptionFoto);


	$(iconSearch).click(function(event) {
		$(inputSearch).focus();
	});

	$(smallBlockMenu).click(function(event) {
		$(listFoto).toggleClass('marginForSmallDevise');
	});


	$(listFoto).click( (function(event) {

		var PREVIEW = 'preview',
			ITEM_PREVIEW = 'itemFoto',
		  	DESCRIPTION = 'textForFoto';

		return function ( event ){

			var target = event.target,
				parent, _src;

			if ( $(target).hasClass( PREVIEW ) ) {

				displayMainBlock( event.target.src  );
				return;
			} else {

				if ( $(target).hasClass( DESCRIPTION ) ) {

					parent = getParentNode( target, ITEM_PREVIEW );
					_src = ( $(parent).find('.preview') )[0].src;
					displayMainBlock( _src );
					return;
				}
			}
		};

	})() );


	var displayMainBlock = (function ( src ){

		var descriptionFoto = $('.descriptionFoto'),
			fotoForDescription = $('.fotoForDescription'),
			content = $('.content');

		return function ( src ){

			fakeStorage.getDescription()
			.then(function( response ){

				$(content).html( response );
				$(fotoForDescription).attr({'src' : src });
				$(descriptionFoto).show();
			})
		}

	})();


	function getParentNode ( htmlElement, className ) {

		while( true ){

			if( $( htmlElement ).hasClass( className ) ){
				return htmlElement;
			} else {
				htmlElement = htmlElement.parentElement;
			}
		}
	};


	function hideDescriptionFoto ( event ) {
		var target = event.target;

		while( true ){

			if( $( target ).hasClass('descriptionFoto') ){
				$( target ).hide();
				return;
			} else {
				target = target.parentElement;
			}
		}
	}

})()