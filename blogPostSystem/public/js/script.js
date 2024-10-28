$(document).ready(function() {
    $('#submitForm').on('submit', function(e) {
        e.preventDefault();

        const title = sanitizeInput($('#txtTitle').val());
        const body = sanitizeInput($('#txtBody').val());

        $.ajax({
            url: '/post/add',
            type: 'POST',
            data: {
                blog_title: title,
                blog_body: body,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                getPost(response.data);

                $('#txtTitle').val('');
                $('#txtBody').val('');
                
                Dialog.showMessageDialog('^_^', 'Your post has been uploaded!');
            },
            error: function(xhr) {
                const errors = xhr.responseJSON.errors;
                let errorMessage = '';

                Object.keys(errors).forEach(function(key) {
                    errorMessage += `- ${errors[key][0]}\n`;
                });
                
                Dialog.showPlainDialog(`Oops! Error Code ${xhr.status}\n\n` + errorMessage);
            }
        });
    });

    function updateTimeElapsed(element, created_at) {
        const createdAt = new Date(created_at).getTime();
        const now = Date.now();
        const secondsElapsed = Math.floor((now - createdAt) / 1000);
        const formatter = new Intl.RelativeTimeFormat('en-US', { style: 'short' });

        let timeString;

        if (secondsElapsed < 60) {
            timeString = formatter.format(-secondsElapsed, 'second');
        } else if (secondsElapsed < 3600) {
            timeString = formatter.format(-Math.floor(secondsElapsed / 60), 'minute');
        } else if (secondsElapsed < 86400) {
            timeString = formatter.format(-Math.floor(secondsElapsed / 3600), 'hour');
        } else if (secondsElapsed < 604800) {
            timeString = formatter.format(-Math.floor(secondsElapsed / 86400), 'day');
        } else if (secondsElapsed < 2419200) {
            timeString = formatter.format(-Math.floor(secondsElapsed / 604800), 'week');
        } else if (secondsElapsed < 29030400) {
            timeString = formatter.format(-Math.floor(secondsElapsed / 2419200), 'month');
        } else {
            timeString = formatter.format(-Math.floor(secondsElapsed / 29030400), 'year');
        }

        element.text(timeString);
    }

    $('.time-elapsed').each(function() {
        const element = $(this);
        const createdAt = element.data('created-at');
        setInterval(function() {
            updateTimeElapsed(element, createdAt);
        }, 1000);
    });

    function getPost(data) {
        const { blog_title, blog_body, created_at } = data;
        const div = $(`
            <div class="blog-container">
                <div class="blog-title d-flex justify-content-between">
                    <h4>${blog_title}</h4>
                    <p class="time-elapsed" data-created-at="${created_at}"></p>
                </div>
                <div class="blog-body">
                    <p>${blog_body}</p>
                </div>
            </div>
        `);

        $('.post-list').append(div);

        const child = div.find('.time-elapsed');

        setInterval(function() {
            updateTimeElapsed(child, child.data('created-at'));
        }, 1000);
    }

    function sanitizeInput(str) {
        return str.replace(/<[^>]*>/g, '');
    }
});