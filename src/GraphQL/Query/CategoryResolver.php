<?php

namespace App\GraphQL\Query;

use App\Models\Category\Categories;
use App\Models\Products\Product;
use Throwable;
use RuntimeException;

class CategoryResolver
{
    /**
     * Fetches all categories.
     *
     * @param mixed $rootValue
     * @param array $args
     *
     * @return array
     */
    public static function getCategories($rootValue, $args): array
    {
        return Categories::all();
    }

    /**
     * Fetches a category with a products.
     * 
     * @param mixed $rootValue
     * @param array $args
     *
     * @return array
     *
     */
    public static function getCategoryPage($rootValue, $args)
    {
        try {

            if (!isset($args['id']) || $args['id'] == 1) {
                $category = Categories::first();
                $products = Product::all();
            } else {
                $category = Categories::find($args['id']);
                $products = Product::where('category_id', $category->id);
            }

            $products = Product::with($products, 'attributes', 'price');

            return [
                'id' => $category->id,
                'name' => $category->name,
                'url_key' => $category->url_key,
                'products' => $products
            ];
        } catch (Throwable $e) {
            throw new RuntimeException("Error fetching category: " . $e->getMessage());
        }
    }
}
