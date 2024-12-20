<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/', [PostController::class, 'index']);
Route::get('/post/all', [PostController::class, 'getPosts']);
Route::post('/post/add', [PostController::class, 'store']);
