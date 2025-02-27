<?php

declare(strict_types=1);

namespace App\GraphQL\Query;

use App\Models\Products\Product;
use Throwable;
use RuntimeException;

class ProductResolver
{
    /**
     * Get product by SKU
     * 
     * @param mixed $rootValue
     * @param array $args
     * @return Product
     * @throws RuntimeException
     */
    public static function getProductBySku($rootValue, $args): mixed
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
