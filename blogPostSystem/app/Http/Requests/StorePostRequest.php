<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'blog_title' => 'required|string|max:100|unique:posts,blog_title',
            'blog_body' => 'required|string|max:255'
        ];
    }

    public function messages(): array
    {
        return [
            'blog_title.required' => 'The blog title is required.',
            'blog_body.required' => 'The blog body is required.'
        ];
    }
}
