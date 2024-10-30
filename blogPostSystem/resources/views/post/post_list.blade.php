@forelse ($posts as $post)
    <div class="blog-container">
        <div class="blog-title d-flex justify-content-between">
            <h4>{{ $post->blog_title }}</h4>
            <p class="time-elapsed" data-created-at="{{ $post->created_at }}"></p>
        </div>
        <div class="blog-body">
            <p>{{ $post->blog_body }}</p>
        </div>
    </div>
@empty
    <div class="blog-container" id="emptyPostLabel">No post uploaded yet</div>
@endforelse
