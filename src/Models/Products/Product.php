<?php

namespace App\Models\Products;

use App\Models\Model;
use App\Models\Category\Categories;
use App\Models\ProductAttribute\ProductAttributes;
use App\Models\Price\ProductPrice;

class Product extends Model
{
    protected static string $table = 'products';
    public int $id;
    public string $sku;
    public string $name;
    public string $description;
    public int $category_id;
    public string $brand;
    protected string $gallery;
    public int $inStock;

    public function __construct(array $attributes = [])
    {
        parent::__construct(attributes: $attributes);

        if (isset($this->attributes['gallery']) && is_string($this->attributes['gallery'])) {
            $this->attributes['gallery'] = json_decode($this->attributes['gallery'], true);
        }
    }

    public function price()
    {
        return $this->hasMany(ProductPrice::class, 'product_id');
    }

    public function attributes()
    {
        $records = $this->hasMany(ProductAttributes::class, 'product_id');

        $attributes = [];

        foreach ($records as $record) {
            $attribute = $record->attribute();
            $attributeCode = $attribute->attribute_code;
            $attributeType = $attribute->type;

            if (!isset($attributes[$attributeCode])) {
                $attributes[$attributeCode] = [
                    'attribute_code' => $attributeCode,
                    'name' => $attribute->name,
                    'type' => $attributeType,
                    'items' => [],
                ];
            }

            $attributes[$attributeCode]['items'][] = [
                'product_id' => $record->product_id,
                'value' => $record->value,
            ];
        }

        return array_values($attributes);
    }

    public function category(): ?Categories
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }
}
