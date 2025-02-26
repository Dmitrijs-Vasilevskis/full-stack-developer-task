<?php

namespace App\GraphQL\Query;

use App\Models\Products\Product;
use Throwable;
use RuntimeException;

class ProductResolver
{
    public static function getProductBySku($rootValue, $args)
    {
        try {
            $product = Product::where('sku', $args['sku']);

            $product = Product::with($product, 'attributes', 'price');

            return reset($product);
        } catch (Throwable $e) {
            throw new RuntimeException("Error fetching product: " . $e->getMessage());
        }
    }
}
