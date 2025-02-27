<?php

declare(strict_types=1);

namespace App\Models\Attributes;

use App\Models\Model;
use App\Models\ProductAttribute\ProductAttributes;

class Attributes extends Model
{
    protected static string $table = 'attributes';

    public int $id;

    public string $attribute_code;

    public string $name;
    
    public string $type;

    public function attributeValues(): array
    {
        return $this->hasMany(ProductAttributes::class, 'attribute_id');
    }
}
