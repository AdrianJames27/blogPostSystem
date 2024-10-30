<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // index page
    public function index()
    {
        return view('post.index');
    }

    // get all blog posts
    public function getPosts()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        return view('post.post_list', compact('posts'));
    }

    // store the blog post
    public function store(StorePostRequest $request)
    {
        $post = Post::create([
            'blog_title' => $request->blog_title,
            'blog_body' => $request->blog_body
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Successfully Uploaded!',
            'data' => $post
        ]);
    }
}
