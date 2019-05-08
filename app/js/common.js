document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

    /*******************************************************/
    //MENUS MOBILE
    /*******************************************************/

    (function() {
        let windowWidth = window.innerWidth;
        const $asideNavList = $( '.aside__nav-list' ),
            $asideNavButton = $( '.aside__nav-button' );

        $asideNavButton.click( function() {
            if ( window.innerWidth <= 768 ) {
                $( this ).toggleClass( 'active' );
                $asideNavList.slideToggle( 200 );
            }
        } );

        $( '.mobile-nav' ).find( '.mobile-nav-link' ).click( function( e ) {
            if ( window.innerWidth <= 768 ) {
                if ( ! $( this ).closest( '.mobile-nav-item' ).hasClass( 'active' ) ) {
                    e.preventDefault();
                    $( this ).next( '.mobile-nav-box' ).slideDown( 200 );
                    $( this ).closest( '.mobile-nav-item' ).addClass( 'active' ).siblings().removeClass( 'active' ).find( '.mobile-nav-item' ).removeClass( 'active' ).end().find( '.mobile-nav-box' ).slideUp( 200 );
                }
            }
        });

        window.addEventListener( 'resize', function() {
            const newWindowWidth = window.innerWidth;

            if ( windowWidth !== newWindowWidth ) {
                windowWidth = newWindowWidth;
                $asideNavButton.removeClass( 'active' );
                $( '.mobile-nav' ).removeAttr( 'style' ).find( '.mobile-nav-item, .mobile-nav-box' ).removeAttr( 'style').removeClass( 'active' );

                $asideNavButton.removeClass( 'active' );
                $asideNavList.removeAttr( 'style' );
            }

        } );

    } () );




    /*******************************************************/
    //ACCORDION
    /*******************************************************/
     $( '.accordion' ).each( function() {
        const $this = $( this );
        if ( $this.children( '.accordion__box' ).length ) {
            $this.prepend( '<button type="button" class="accordion__button"></button>' );
        }
        ( $this.hasClass( 'current' ) || $this.find( '.current' ).length ) ? $this.addClass( 'active' ) : $this.children( '.accordion__box' ).hide();
    } ).on( 'click', '.accordion__button', function( e ) {
        e.stopPropagation();
        const $this = $( this );
        $this.closest( '.accordion' ).hasClass( 'active' ) ? $this.closest( '.accordion' ).removeClass( 'active' ).children( '.accordion__box' ).slideUp( 200 ) : $this.closest( '.accordion' ).addClass( 'active' ).children( '.accordion__box' ).slideDown( 200 ).end().siblings().removeClass( 'active' ).children( '.accordion__box' ).slideUp( 200 );
    } );

    /*******************************************************/
    //TITLES SLIDER
    /*******************************************************/
    $( '.titles' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 1,
        nav: true,
        dots: false,
        navText: '',
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 600,
        onInitialize: function( event ) {

            $( event.target ).after( '<div class="titles-dots"></div>' );

            $( event.target ).find( '.titles__item' ).each( function() {

                $( event.target ).next( '.titles-dots' ).append( $( '<div class="titles-dots__item"></div>' ).text(   $( this ).find( '.titles__item-text' ).text() ) );
            } );

            $( event.target ).next( '.titles-dots' ).addClass( 'owl-carousel' ).owlCarousel( {
                loop: true,
                items: 4,
                nav: true,
                dots: false,
                navText: '',
                smartSpeed: 600,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    481: {
                        items: 3
                    },
                    769: {
                        items: 3
                    },
                    993: {
                        items: 4
                    },
                },
                onInitialize: function( event ) {
                    
                    $( event.target ).on( 'click', '.owl-item', function() {
                        $( event.target ).trigger( 'to.owl.carousel', $( this ).closest( '.owl-item' ).index() - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) );
                    } );
                },
                onTranslate: function( event ) {

                    if ( ! $( event.target ).hasClass( 'listener-translate-event' ) ) {

                        $( event.target ).prev( '.titles' ).addClass( 'listener-translate-event' ).trigger( 'to.owl.carousel', event.item.index + (event.item.count - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) ) )
                    } else {
                        $( event.target ).removeClass( 'listener-translate-event' );
                    }
                },
            } );
        },
        onTranslate: function( event ) {

            if ( ! $( event.target ).hasClass( 'listener-translate-event' ) ) {

                $( event.target ).next( '.titles-dots' ).addClass( 'listener-translate-event' ).trigger( 'to.owl.carousel', event.item.index + (event.item.count - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) ) );
            } else {
                $( event.target ).removeClass( 'listener-translate-event' );
            }
        },
    } );

    /*******************************************************/
    //ADVANTAGES
    /*******************************************************/
    $( '.advantages' ).addClass( 'tabs' ).each( function() {
        const $this = $( this );
        $this.prepend('<div class="advantages__buttons tabs__buttons"></div>');
        $this.find( '.advantages__item-title' ).addClass( 'tabs__button' ).appendTo( $this.find( '.tabs__buttons' ) );
        $this.find( '.advantages__item' ).addClass( 'tabs__section' ).not( ':first' );
    } );

    /*******************************************************/
    //READ MORE
    /*******************************************************/

    (function() {
        const $readMore = $( '.read-more' );

        $readMore.each( function() {
            const $this = $( this ),
                $thisHeight = $this.height(),
                $thisMaxHeight = $this.attr( 'data-max-height' );

            if ( $thisHeight >= $thisMaxHeight ) {

                $this.css( {
                    'max-height' : $thisMaxHeight + 'px'
                } ).after( '<button type="button" class="read-more-button hide">Читать полностью</button>' );
            }
        });

        $readMore.next( '.read-more-button' ).on( 'click', function() {
            const $this = $( this ),
                $thisMaxHeight = $this.prev( $readMore ).attr( 'data-max-height' );

            if ( $this.hasClass( 'hide' ) ) {
                $this.removeClass( 'hide' ).prev( $readMore );
                const $thisTextHeight = $this.prev( $readMore ).removeAttr( 'style' ).height();
                $this.html( 'Скрыть' ).prev( $readMore ).css( {
                    'max-height' : $thisMaxHeight + 'px'
                } ).animate( {
                    'max-height' : $thisTextHeight + 'px'
                }, 300);
            } else {
                $this.addClass( 'hide' ).html( 'Читать полностью' ).prev( $readMore ).animate({
                    'max-height' : $thisMaxHeight + 'px'
                }, 300);
            }
        });

    } () );

    /*******************************************************/
    //HOME GOODS
    /*******************************************************/
    $( '.home-goods' ).addClass( 'tabs' ).each( function() {
        const $this = $( this );
        $this.prepend('<div class="home-goods__buttons tabs__buttons"></div>');
        $this.find( '.home-goods__title' ).addClass( 'tabs__button' ).appendTo( $this.find( '.tabs__buttons' ) );
        $this.find( '.home-goods__section' ).addClass( 'tabs__section' ).not( ':first' );
    } );


    /*******************************************************/
    //BRANDS SLIDER
    /*******************************************************/
    $( '.brands' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 6,
        nav: true,
        navText: '',
        dots: false,
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 600,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            361: {
                items: 3
            },
            481: {
                items: 4
            },
            993: {
                items: 5
            },
            1191: {
                items: 6
            }
        },
    } );



    /*******************************************************/
    //REVIEWS SLIDER
    /*******************************************************/
    $( '.reviews' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 4,
        nav: true,
        navText: '',
        dots: false,
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 600,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            361: {
                items: 3
            },
            641: {
                items: 4
            }
        },
        onInitialize: function( event ) {

            $( '.review' ).find( '.review__item' ).not( ':first' ).hide();

            $( event.target ).find( '.reviews__item' ).each( function () {
                $( this ).attr( 'data-index', $( this ).index() );
            } );

            $( event.target ).on( 'click', '.owl-item', function() {
                $( '.review' ).find( '.review__item' ).eq( $( this ).find( '.reviews__item' ).attr( 'data-index' ) ).slideDown( 300 ).siblings().slideUp( 300 );
            } );
        },
    } );

    /*******************************************************/
    //SCROLL
    /*******************************************************/
    $( '.scroll' ).click( function() {
        $( 'html,body' ).animate( { scrollTop : 0 }, 600 );
    } );

    //*********************************************************//
    //MLTIPLE RANGE SLIDER
    //*********************************************************//
    ( function() {

        const sliders = document.querySelectorAll( '.input-range-multiple' );

        for ( let i = 0, slider; slider = sliders[ i ]; i++ ) {

            const sliderInput = slider.querySelectorAll( 'input' );

            const sliderElem = document.createElement( 'div' );
            sliderElem.className = 'noUi';

            slider.appendChild( sliderElem );

            noUiSlider.create( sliderElem, {
                start: [ sliderInput[ 0 ].value, sliderInput[ 1 ].value ],
                connect: true,
                range: {
                    'min': + sliderInput[ 0 ].getAttribute( 'min' ),
                    'max': + sliderInput[ 0 ].getAttribute( 'max' )
                },
                step:  + sliderInput[ 0 ].getAttribute( 'step' ),
            } );

            sliderElem.noUiSlider.on( 'update', function ( values, handle ) {
                sliderInput[ handle ].value = parseInt( values[ handle ] );
            } );

            for ( let i = 0; i < sliderInput.length ; i++ ) {
                sliderInput[ i ].addEventListener( 'change', function () {
                    sliderElem.noUiSlider.set( [ sliderInput[ 0 ].value, sliderInput[ 1 ].value ] );
                } );
            }
        }

    } () );

    /*******************************************************/
    //HIDE FILTER ITEM
    /*******************************************************/
    $( '.subpart__filter-item' ).on( 'click', '.subpart__filter-button, .subpart__filter-title', function() {
        $( this ).closest( '.subpart__filter-item' ).toggleClass( 'hide' ).find( '.subpart__filter-box').slideToggle( 300 );
    } );

    /*******************************************************/
    //CARD SLIDER
    /*******************************************************/
    $( '.card__slider' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 3,
        nav: true,
        navText: '',
        dots: false,
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 600,
        mouseDrag: false,
        touchDrag: false,
        onInitialize: function( event ) {

            $( event.target ).closest( '.card__picture' ).prepend( '<div class="card__picture-image"></div>');

            $( event.target ).find( '.card__slider-item' ).each( function( i ) {
                $( event.target ).closest( '.card__picture' ).find( '.card__picture-image' ).append( $('<div class="card__picture-image-item' + ( i === 0 ? ' active' : '' ) + '"></div>').append( $( this ).find( 'img' ).clone()));
            } );

            $( event.target ).on( 'click', '.owl-item', function() {
                $( event.target ).trigger( 'to.owl.carousel', $( this ).closest( '.owl-item' ).index() - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) );
            } );
        },
        onTranslate: function( event ) {

            $( event.target ).closest( '.card__picture' ).find( '.card__picture-image-item' ).eq( event.item.index - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) ).addClass( 'active' ).siblings().removeClass( 'active' )
        },
    } );


    /*******************************************************/
    //CARD CONTENT
    /*******************************************************/
    $( '.card__content' ).addClass( 'tabs' ).each( function() {
        const $this = $( this );
        $this.prepend('<div class="card__content-buttons tabs__buttons"></div>');
        $this.find( '.card__content-title' ).addClass( 'tabs__button' ).appendTo( $this.find( '.tabs__buttons' ) );
        $this.find( '.card__content-item' ).addClass( 'tabs__section' ).not( ':first' );
    } );


    /*******************************************************/
    //TABS
    /*******************************************************/
    $('.tabs').each( function() {
        const $this = $( this );
        $this.find( '.tabs__button' ).first().addClass( 'active' );
        $this.find( '.tabs__section' ).not( ':first' ).hide();
        $this.find( '.tabs__buttons' ).on('click', '.tabs__button:not( .active )', function() {
            $( this ).addClass( 'active' ).siblings().removeClass( 'active' ).closest( '.tabs' ).find( '.tabs__section' ).slideUp(300).eq( $( this ).index() ).slideDown( 300 );
        } );
    } );

    /*******************************************************/
    //CARD SPECIALIST
    /*******************************************************/
    $( '.card__specialist-item' ).each( function () {
        const $this = $( this );

        setTimeout( function () {
            $this.addClass( 'active' );
        }, 5000 );

        $this.find( '.card__specialist-box' ).append( '<button class="card__specialist-button"></button>' );
    } ).on( 'click', '.card__specialist-button', function () {
        $( this ).closest( '.card__specialist-item' ).toggleClass( 'active' );
    } );

} );
