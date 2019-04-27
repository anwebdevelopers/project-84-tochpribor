document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

    /*******************************************************/
    //MENU MOBILE
    /*******************************************************/

    (function() {
        let windowWidth = window.innerWidth;
        const $headerCatalogMenu = $( '.header__catalog-menu' ),
            $headerCatalogButton = $('.header__catalog-button');

        $headerCatalogButton.click( function() {
            if ( window.innerWidth <= 768 ) {
                $( this ).toggleClass( 'active' );
                $headerCatalogMenu.slideToggle( 200 );
            }
        } );

        $headerCatalogMenu.find('.header__catalog-menu-link').click( function( e ) {
            if ( window.innerWidth <= 768 ) {
                    const $headerCatalogMenuBox = $(this).next('.header__catalog-menu-box'),
                    $headerCatalogMenuItem = $(this).closest('.header__catalog-menu-item');
                if ( ! $headerCatalogMenuItem.hasClass('active') ) {
                    e.preventDefault();
                    $headerCatalogMenuBox.slideDown(200);
                    $headerCatalogMenuItem.addClass('active').siblings().removeClass('active').find('.header__catalog-menu-box').slideUp(200);
                }
            }
        });

        window.addEventListener( 'resize', function() {
            const newWindowWidth = window.innerWidth;

            if ( windowWidth !== newWindowWidth ) {
                windowWidth = newWindowWidth;
                $headerCatalogButton.removeClass('active');
                $headerCatalogMenu.removeAttr('style').find('.header__catalog-menu-item, .header__catalog-menu-box').removeAttr('style').removeClass('active');
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
    //MENU
    /*******************************************************/
    // ( function() {
    //
    //     let windowWidth = window.innerWidth;
    //
    //     const elemNav = document.querySelector( '.nav' ),
    //         buttonNav = document.querySelector('.header__nav-button');
    //
    //     buttonNav.addEventListener( 'click', function( e ) {
    //         e.stopPropagation();
    //         if ( buttonNav.classList.contains( 'active' ) ) {
    //             buttonNav.classList.remove('active');
    //             elemNav.classList.remove('active');
    //         } else {
    //             buttonNav.classList.add( 'active' );
    //             elemNav.classList.add('active');
    //         }
    //     } );
    //
    //     window.addEventListener( 'resize', function() {
    //
    //         const newWindowWidth = window.innerWidth;
    //
    //         if ( windowWidth !== newWindowWidth ) {
    //
    //             windowWidth = newWindowWidth;
    //
    //             buttonNav.classList.remove('active');
    //             // elemNav.style.display = '';
    //             elemNav.classList.remove('active');
    //         }
    //     } );
    //
    //     const navMenuElems = document.querySelectorAll( '.nav__menu a' );
    //
    //     for ( let i = 0; i < navMenuElems.length; i++ ) {
    //         navMenuElems[ i ].addEventListener( 'click', function( event ) {
    //             buttonNav.classList.remove('active');
    //             elemNav.classList.remove('active');
    //         } );
    //     }
    //
    // } () );



    /*******************************************************/
    //SCROLL
    /*******************************************************/
    // ( function() {
    //
    //     const scrollTrigElems = document.querySelectorAll( '.scroll' );
    //
    //     for ( let i = 0; i < scrollTrigElems.length; i++ ) {
    //
    //         const scrollSectElem = document.querySelector( scrollTrigElems[ i ].getAttribute( 'href') );
    //
    //         scrollSectElem && scrollTrigElems[ i ].addEventListener( 'click', function( event ) {
    //
    //             window.scrollBy( {
    //                 top: scrollSectElem.scrollHeight,
    //                 behavior: 'smooth'
    //             } );
    //
    //         } );
    //     }
    //
    // } () );



    //*********************************************************//
    //Lazy load for images
    //*********************************************************//
    // ( function() {
    //
    //     const lazyLoadImg = new IntersectionObserver(
    //
    //         function( entries ) {
    //
    //             for ( let i = 0; i < entries.length; i++  ) {
    //
    //                 const entry = entries[ i ];
    //                 const target = entry.target;
    //
    //                 if ( entry.isIntersecting && target.hasAttribute( 'data-lazy-load' ) ) {
    //
    //                     if ( target.nodeName === 'IMG' ) {
    //                         target.setAttribute( 'src', target.getAttribute( 'data-lazy-load' ) );
    //                     } else if ( target.nodeName === 'SOURCE' ) {
    //                         target.setAttribute( 'srcset', target.getAttribute( 'data-lazy-load' ) );
    //                     } else {
    //                         target.style.backgroundImage = 'url(' + target.getAttribute( 'data-lazy-load' ) + ')';
    //                     }
    //
    //                     target.removeAttribute( 'data-lazy-load' )
    //
    //                     lazyLoadImg.unobserve( target );
    //
    //                     target.style.opacity = 1;
    //                 }
    //             }
    //         },
    //         {
    //             root: null,
    //             rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
    //             threshold: [ 0 ],
    //         }
    //     );
    //
    //     // Start observing an element
    //     const lazyLoadImgElems = document.querySelectorAll( '[ data-lazy-load ]' );
    //
    //     for ( let i = 0; i < lazyLoadImgElems.length; i++  ) {
    //
    //         lazyLoadImg.observe( lazyLoadImgElems[ i ] );
    //
    //         lazyLoadImgElems[ i ].style.opacity = 0;
    //         lazyLoadImgElems[ i ].style.transition = '1s';
    //     }
    //
    // } () );


    //Выключение при клике по странице
    // document.addEventListener( 'click', function( event ) {
    //     if ( ! event.target.closest( '.selector' ) ) {
    //
    //     }
    // } );

    //Выключение скрытого меню по ресайзу
    // $(window).resize(function() {
    //
    //     if (w > 992 && $(".header__nav").is(':hidden')) {
    //         $('.header__nav').removeAttr('style');
    //     }
    // });


    //---------------------------------
    //Адаптивный слайдер
    //---------------------------------
    // $( '.slider' ).addClass( 'owl-carousel' ).owlCarousel( {
    //     loop: true,
    //     items: 1,
    //     nav: true,
    //     navText: '',
    //     autoplayTimeout: 5000,
    //     autoplay: true,
    //     smartSpeed: 1200,
    //     autoHeight: true,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 2
    //         },
    //         481: {
    //             items: 3
    //         },
    //         769: {
    //             items: 4
    //         },
    //         993: {
    //             items: 5
    //         }
    //     },
    //     onInitialize: function( event ) {
    //         $( event.target ).find( '.about__item' ).each( function() {
    //             $( this ).attr( 'data-item-counter', $( this ).index() + 1 )
    //         } );
    //     },
    //     onInitialized: function( event ) {
    //         $( event.target ).append( '<div class="about__counter"><div class="about__counter-current">' + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) + '</div><div class="about__counter-amount"> / ' + ( $( event.target ).find( '.owl-item:not( .cloned )' ).length ) + '</div></div>' );
    //     },
    //     onTranslated: function( event ) {
    //         $( event.target ).find( '.about__counter-current' ).text( $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) )
    //     }
    // } );



    //--------------------------------------------------------------
    //Табы
    //--------------------------------------------------------------
    // $('.tabs__buttons button').first().addClass('active');
    // $(".tabs__item").not(":first").hide();
    // $('.tabs__buttons').on('click', 'button:not(.active)', function() {
    //     $(this).addClass('active').siblings().removeClass('active').closest('.tabs').find('.tabs__item').hide().eq($(this).index()).fadeIn(300);
    // });

});
