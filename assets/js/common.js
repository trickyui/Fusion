$(document).ready(function () {
    $('textarea').on({
        keyup: function () {
            var elem = $(this);
            var text_max = elem.attr('maxlength');
            elem.parent().find('.text-counter').remove();
            elem.parent().append('<span class="text-counter">' + text_max + '</span>');
            var text_length = elem.val().length;
            var text_remaining = text_max - text_length;
            elem.parent().find('.text-counter').html(text_remaining);
        },
        focusout: function () {
            var elem = $(this);
            elem.parent().find('.text-counter').remove();
        }
    });
    $('.nav-open').on('click', function () {
        $('nav').addClass('open');
    });
    $('.nav-close').on('click', function () {
        $('nav').removeClass('open');
    });
    $('[id^="panel"] .item-list li>a').not('.item-toggle').on('click', function () {
        $(this).closest('[id^="panel"]').addClass('out');
        $('.nav-open').parent('li').hide();
        $('#_back').parent('li').show();
    });
    if (!$('#panelOne').hasClass('out')) {
        $('#_back').parent('li').hide();
    }
    $('#_back').on('click', function () {
        if (!$('#panelTwo').hasClass('out')) {
            $('.nav-open').parent('li').show();
            $(this).parent('li').hide();
        }
        $('main').find('[id^="panel"].out:last').removeClass('out');
    });
    $('.item-toggle').on('click', function () {
        var elem = $(this);
        elem.parent('li').siblings().find('.item-toggle').removeClass('active');
        elem.toggleClass('active').siblings('.sub-item-list').slideToggle();
        elem.find('i').toggleClass('down');
    });
    $('#fileUpload').on('change', function () {
        for (var i = 0; i < $(this).get(0).files.length; i++) {
            $('#files').append('<li>' + $(this).get(0).files[i].name + '<a class="clear-file"><i class="material-icons">clear</i></a></li>');
        }
    });
    $(document).on('click', '.clear-file', function () {
        $(this).parent('li').remove();
    });
    var textarea = Array.from(document.querySelectorAll('textarea'));
    textarea.forEach(e => {
        e.addEventListener('keydown', autosize);
        function autosize() {
            var el = this;
            setTimeout(function () {
                el.style.cssText = 'height:auto;';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + (el.scrollHeight + 2) + 'px';
            }, 0);
        }
    })
    // var chatbox =  Array.from(document.querySelectorAll('.post-box'));
    // chatbox.forEach(e => {
    //     e.addEventListener('keydown', () => {
    //         var item = e.parentElement.previousElementSibling;
    //         setTimeout(function () {
    //             item.style.height = 'calc(100% - ' + (e.scrollHeight + 16) + 'px)';
    //         }, 100);
    //     });
    //     e.addEventListener('blur', () => {
    //         var item = e.parentElement.previousElementSibling;
    //         var h = item.scrollHeight;
    //         item.animate({ scrollTop: h });
    //     });
    // });
    $('.post-box').on({
        keydown: function () {
            var el = this;
            var item = $(el).parent('.text-area').prev('.post-area');
            setTimeout(function () {
                item.css({ 'height': 'calc(100% - ' + (el.scrollHeight + 20) + 'px)' });
            }, 0);
        },
        blur: function () {
            var el = this;
            var item = $(el).parent('.text-area').prev('.post-area');
            var height = item.height();
            item.animate({ scrollTop: height });
            // console.log(el.value);

        }
    });

    $('.post-btn').on('click', function () {
        var elem = $(this);
        var postArea = elem.parent().prev('.post-area');
        var textarea = elem.siblings('textarea');
        var text = textarea.val();
        // console.log(typeof(text));
        if (typeof (text) !== 'string' || text.trim() == '') {
            postArea.css({ 'height': 'calc(100% - 56px)' });
            textarea.val("").css({ 'height': '40px' });
            return false;
        }
        elem.parent('.text-area').prev('.post-area').find('ul').append('<li class="right"><div class="chat">' + text + '</div></li>');
        postArea.css({ 'height': 'calc(100% - 56px)' });
        textarea.val('').css({ 'height': '40px' });
    });
    $('[data-toggle="dropdown"]').click(function () {
        var elem = $(this);
        autoPosition(elem);
    });
    $(document).on('keyup', '#token-input-', function () {
        var elem = $(this);
        autoPosition(elem);
    });

    jQuery(".swipeNav").touchwipe({
        wipeRight: function () {
            jQuery('#navigation').addClass('open');
        },
        preventDefaultEvents: false
    });
    jQuery("#navigation").touchwipe({
        wipeLeft: function () {
            jQuery('#navigation').removeClass('open');
        }
    });
    // alertMsg("Computer may be define as a machine which can solve airthmetical and logical problems undre some instrutions and the programs.", 'success', 5000);

});
function autoPosition(elem) {
    var offset, position, canvas, dropMenu, menuHeight;
    offset = elem.offset();
    position = offset.top;
    dropMenu = elem.next('ul');
    menuHeight = dropMenu.height();
    canvas = $(window).height();
    if (position > menuHeight && (canvas - position) < menuHeight) {
        dropMenu.addClass('top');
    } else {
        dropMenu.removeClass('top');
    }
}
// function mySearch() {
//     var input, filter, ul, li1, li2, item;
//     input = document.getElementById("myInput");
//     filter = input.innerHTML.toUpperCase();
//     ul = document.getElementById("searchList");
//     // li1 = ul.querySelectorAll('li');
//     li2 = ul.querySelectorAll('.card li');
//     // console.log(li2);
//     for (i = 0; i < li2.length; i++) {
//         item = li2[i].parentNode.parentNode.parentNode;
//         if (li2[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
//             item.style.display = 'block';
//         } else {
//             item.style.display = 'none';
//         }
//     }
// }
$(window).load(function () {
    $(".loader").fadeOut("slow");
});

// Alert Message
function alertMsg(text, alertType, timeout) {
    var elem = document.getElementById('alertMsg');
    if (!elem) {
        var node = document.createElement("DIV");
        node.setAttribute('class', 'alert alert-' + alertType + ' alert-floating');
        node.setAttribute('id', 'alertMsg');
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        document.getElementsByTagName('body')[0].appendChild(node);
        setTimeout(() => {
            var element = document.getElementById('alertMsg');
            element.classList.add('hide-msg');
            setTimeout(() => {
                document.getElementsByTagName('body')[0].removeChild(element);
            }, 1000);
        }, timeout);
    }
}


