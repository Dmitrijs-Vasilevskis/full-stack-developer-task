<?php

namespace App\Models\ProductAttribute;

use App\Models\Model;
use App\Models\Products\Product;
use App\Models\Attributes\Attributes;

class ProductAttributes extends Model
{
    protected static string $table = 'product_attributes';
    public int $id;
    public int $product_id;
    public int $attribute_id;
    public string $value;

    public function product(): ?Product
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function attribute(): ?Attributes
    {
        return $this->belongsTo(Attributes::class, 'attribute_id');
    }
}
