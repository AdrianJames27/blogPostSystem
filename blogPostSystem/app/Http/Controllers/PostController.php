<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();

        return view('post.index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $post = Post::where('blog_title', $request->blog_title)->orderBy('blog_id', 'desc')->first();

        return response()->json([
            'status' => 200,
            'data' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
