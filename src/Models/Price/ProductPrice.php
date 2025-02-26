<?php

namespace App\Models\Price;

use App\Models\Model;
use App\Models\Products\Product;

class ProductPrice extends Model
{
    protected static string $table = 'prices';
    public int $id;
    public int $product_id;
    public string $amount;
    public string $currency;
    public string $currency_symbol;

    public function product(): ?Product
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
