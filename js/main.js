jQuery(document).ready(function($) {
    $('a.active').parents('.sub_nav .dropdown').find('.current_opt').addClass('sel');
    $('.dropdown').on('click', function(e) {
        e.preventDefault()
        $('.dropdown').each(function() {
            $(this).removeClass('active')
        })
        $(this).toggleClass('active')
        $('.dropdown').each(function() {
            if (!$(this).hasClass('active')) {
                $(this).find('.opts').hide("fast")
            } else {
                $(this).find('.opts').toggle("fast")
            }
        })
        $(this).find('.current_opt').toggleClass(function() {
            if ($(this).parents('dropdown').hasClass('active')) {
                return ''
            } else {
                return 'active'
            }
        })
        $(this).find('.current_opt i').toggleClass(function() {
            if ($(this).parents('dropdown').hasClass('active')) {
                return 'i-ar-d'
            } else {
                return 'i-ar-u'
            }
        })
    })
    $('.opts a').each(function() {
        if ($(this).hasClass('active')) {
            var text = $(this).text()
            $(this).parents('.dropdown').find('.current_opt span').text(text)
        }
    })
    $('.opts a').on('click', function(e) {
        e.preventDefault()
        $(this).removeClass('active')
        var text = $(this).text();
        $(this).parents('.dropdown').find('.current_opt').addClass('sel')
        $(this).parents('.dropdown').find('.current_opt span').text(text)
        window.location.replace($(this).attr('href'));
    })
    $('._menu_side').on('click', function(e) {
        e.preventDefault()
        $(this).parents('#right').toggleClass('show_full')
    });
    $(function() {
        $('.lazy').lazy({
            delay: 500
        });
    });
    var defaultPage = 2
    $('#load-more').on('click', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'GET',
            url: '/ajax/movies/more',
            data: {
                page: defaultPage,
                filter: getUrlParameter('filter'),
            },
            dataType: 'json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
            },
            success: function(data) {
                defaultPage = data.page + 1
                $('.loaded-data').append(data.html)
                if (data.hasMorePages == false) {
                    $('#load-more').remove()
                }
                console.log(data)
            },
            error: function(xhr, type) {
                console.log('Ajax error!')
            },
        })
    })

    function hide_banner() {
        $('.banner-info').fadeOut(1000)
    }
    setTimeout(hide_banner, 3000)
    $('._submit').on('click', function(e) {
        e.preventDefault()
        $(this).parents('form').submit()
    })
    $('.owl-carousel-normal').owlCarousel({
        rtl: true,
        loop: true,
        center: false,
        margin: 10,
        dots: false,
        nav: true,
        navText: ['<span class="_scroll right i-ar-r"></span>', '<span class="_scroll left i-ar-l"></span>'],
        navElement: 'div',
        responsive: {
            0: {
                items: 2,
            },
            450: {
                items: 3,
            },
            600: {
                items: 4,
            },
            800: {
                items: 5,
            },
            921: {
                items: 4,
            },
            1120: {
                items: 5,
            },
        },
    })
    $('.owl-carousel-wide').owlCarousel({
        rtl: true,
        loop: true,
        center: false,
        margin: 10,
        dots: false,
        nav: true,
        navText: ['<span class="_scroll right i-ar-r"></span>', '<span class="_scroll left i-ar-l"></span>'],
        navElement: 'div',
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 2,
            },
            800: {
                items: 3,
            },
            921: {
                items: 2,
            },
            1120: {
                items: 3,
            },
        },
    })
    $('.search-show').on('click', function(e) {
        e.preventDefault();
        $('.topsrch').toggle();
    })
    $('.show-menu').on('click', function(e) {
        e.preventDefault();
        $('#right').toggleClass('show_full');
    })
})