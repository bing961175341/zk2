require(['jquery', 'handlebars'], function($, handle) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {

            console.log(res.data);
            var source = $("#list-tpl").html();
            var template = handle.compile(source);
            var html = template(res.data);
            $(".tpls").html(html);
        }
    })
    $(".public").on('click', function() {
        location.href = 'detail.html';
    })

})