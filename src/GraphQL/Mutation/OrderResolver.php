<?php

declare(strict_types=1);

namespace App\GraphQL\Mutation;

use App\Models\Orders\Orders;

class OrderResolver
{
    /**
     *
     * @param mixed $rootValue
     * @param array $args
     * @return array
     */
    public static function placeOrder(mixed $rootValue, array $args): array
    {
        if (!isset($args['input']['items']) || empty($args['input']['items'])) {
            return [
                'status' => false,
                'message' => 'No items provided'
            ];
        }

        $items = $args['input']['items'];
        $totals = array_reduce($items, fn($carry, $item) => $carry + ($item['price'] * $item['quantity']), 0);

        $order = Orders::create([
            'order_items' => json_encode($items, JSON_THROW_ON_ERROR),
            'total' => $totals,
            'status' => 'pending',
        ]);

        return [
            'status' => true,
            'message' => 'Order placed successfully',
            'order_id' => $order->id
        ];
    }
}
