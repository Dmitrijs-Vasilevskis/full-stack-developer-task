<?php

namespace App\Models\Category;

use App\Models\Model;
use App\Models\Products\Product;

class Categories extends Model
{
    protected static string $table = 'categories';

    public int $id;

    public string $name;

    public string $url_key;

    public function products(): ?array
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
