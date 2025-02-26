<?php

declare(strict_types=1);

namespace App\Models\Orders;

use App\Models\Model;

class Orders extends Model
{
    protected static string $table = 'orders';
    public int $id;
    public string $order_items;
    public float $total;
    public string $status;
    public string $created_at;
}
