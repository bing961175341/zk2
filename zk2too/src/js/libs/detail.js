require(['jquery'], function($) {
    $("#btn").on('click', function() {
        var title = $("#title").val();
        var content = $("#content").val();
        console.log(title, content)
        $.ajax({
            url: '/api/detail',
            dataType: 'json',
            data: {
                title: title,
                content: content
            },
            type: 'post',
            success: function(res) {
                console.log(res);
                location.href = 'index.html';
            }
        })
    })
})