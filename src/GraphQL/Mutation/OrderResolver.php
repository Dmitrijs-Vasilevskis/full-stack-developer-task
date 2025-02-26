<?php

declare(strict_types=1);

namespace App\GraphQL\Mutation;

use App\Models\Orders\Orders;

class OrderResolver
{
    public static function placeOrder($rootValue, $args): array
    {
        if (isset($args['input']['items'])) {

            $items = $args['input']['items'];
            $totals = 0;
            foreach ($items as $item) {
                $totals += $item['price'] * $item['quantity'];
            };

            $order = Orders::create([
                'order_items' => json_encode($items),
                'total' => $totals,
                'status' => 'pending',
            ]);

            if ($order) {
                return [
                    'status' => true,
                    'message' => 'Order placed successfully'
                ];
            }
        }

        return [
            'status' => false,
            'message' => 'No items provided'
        ];
    }
}
