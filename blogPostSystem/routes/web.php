<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/', [PostController::class, 'index']);
Route::get('/post/get', [PostController::class, 'show']);
Route::post('/addPost', [PostController::class, 'store']);
