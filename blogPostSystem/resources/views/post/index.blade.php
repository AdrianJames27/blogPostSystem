<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            body {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .post-section {
                width: 65vw;
                height: 35%;
                border: 1px solid black;
            }

            .post-list {
                width: 65vw;
                height: 35%;
            }

            .post-section, .post-list {
                margin: 5%;
            }

            .blog-container {
                margin: 2%;
                padding: 2%;
                border: 1px solid black;
            }

            .blog-title {
                display: inline-flex;
            }
        </style>
        <title>Blog Posting</title>
    </head>
    <body>
        <div class="container">
            <div class="post-section">
                <h1>Add Post</h1>
                <form action="/addPost" method="post" id="submitForm">
                    <div class="form-input">
                        <label for="txtTitle">Blog Title</label> <br>
                        <input type="text" name="txtTitle" id="txtTitle" placeholder="Enter Title">
                    </div>
                    <div class="form-input">
                        <label for="txtBody">Blog Body</label> <br>
                        <textarea name="txtBody" id="txtBody" cols="50" rows="5"></textarea>
                    </div>
                    <div class="form-buttons">
                        <input type="submit" value="Upload Post">
                    </div>
                </form>
            </div>
            <div class="post-list">
                <h1>Post List</h1>
                @if (!empty($posts))
                    @foreach ($posts as $post)
                        <div class="blog-container">
                            <div class="blog-title">
                                <h4> {{ $post->blog_title }} - </h4>
                                <p class="time-elapsed" data-created-at="{{ $post->created_at }}"></p>
                            </div>
                            <div class="blog-body">
                                <p> {{ $post->blog_body }} </p>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="blog-container">No post uploaded yet</div>
                @endif
            </div>
        </div>
        <script>
            const submitForm = document.getElementById('submitForm');
            const txtTitle = document.getElementById('txtTitle');
            const txtBody = document.getElementById('txtBody');
            const token = document.querySelector('meta[name="csrf-token"]');

            submitForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const blog = {
                    blog_title: txtTitle.value,
                    blog_body: txtBody.value,
                };

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/addPost', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('X-CSRF-TOKEN', token.getAttribute('content'));

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);

                        console.log(response);

                        getPost(response.data);

                        txtTitle.value = '';
                        txtBody.value = '';

                        alert('Post has been uploaded!');
                    } else {
                        console.error(`Error: ${xhr.status}`);
                        alert('Error: ' + xhr.responseText);
                    }
                };

                xhr.send(JSON.stringify(blog));
            });
        </script>
        <script>
            function updateTimeElapsed(element, created_at) {
                const createdAt = new Date(`${created_at}`).getTime();
                const now = new Date().getTime();
                const secondsElapsed = Math.floor((now - createdAt) / 1000);
                
                let timeString = null;

                const formatter = new Intl.RelativeTimeFormat('en-US', { style: 'short' });

                // Update the time elapsed every second
                if (secondsElapsed < 60) {
                    timeString = formatter.format(-secondsElapsed, 'second'); // Display seconds
                } else if (secondsElapsed < 3600) {
                    timeString = formatter.format(-Math.floor(secondsElapsed / 60), 'minute'); // Display minutes
                } else if (secondsElapsed < 86400) {
                    timeString = formatter.format(-Math.floor(secondsElapsed / 3600), 'hour'); // Display hours
                } else if (secondsElapsed < 604800) {
                    timeString = formatter.format(-Math.floor(secondsElapsed / 86400), 'day'); // Display days
                } else if (secondsElapsed < 2419200) {
                    timeString = formatter.format(-Math.floor(secondsElapsed / 604800), 'week'); // Display weeks
                } else if (secondsElapsed < 29030400) {
                    timeString = formatter.format(-Math.floor(secondsElapsed / 2419200), 'month'); // Display months
                } else {
                    timeString = formatter.format(-Math.floor(secondsElapsed / 29030400), 'year'); // Display years
                }

                element.innerText = timeString;
            }

            document.querySelectorAll('.time-elapsed').forEach(element => {
                const createdAt = element.getAttribute('data-created-at');
                setInterval(() => {
                    updateTimeElapsed(element, createdAt);
                }, 1000);
            });
        </script>
        <script>
            function getPost(data) {
                const { blog_title, blog_body, created_at } = data;

                const postList = document.querySelector('.post-list');
                const div = document.createElement('div');
                div.classList.add('blog-container');
                div.innerHTML = `
                    <div class="blog-title">
                        <h4> ${blog_title} -</h4>
                        <p class="time-elapsed" data-created-at="${created_at}"></p>
                    </div>
                    <div class="blog-body">
                        <p> ${blog_body} </p>
                    </div>
                `;

                postList.appendChild(div);

                const child = div.children[0].children[1];
                setInterval(() => {
                    updateTimeElapsed(child, child.getAttribute('data-created-at'));
                }, 1000);
            }
        </script>
    </body>
</html>
