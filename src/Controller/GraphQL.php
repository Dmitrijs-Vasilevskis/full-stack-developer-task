<?php

namespace App\Controller;

use App\GraphQL\Query\CategoryResolver;
use App\GraphQL\Query\ProductResolver;
use App\GraphQL\Mutation\OrderResolver;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Utils\BuildSchema;
use RuntimeException;
use Throwable;

class GraphQL {
    public function handle()
    {
        $schema = BuildSchema::build(file_get_contents(__DIR__ . '/../../graphql/schema.graphql'));

        try {
            $rawInput = file_get_contents('php://input');
            
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $requestData = json_decode($rawInput, true);

            $payload = $requestData['query'] ?? $requestData['mutation'] ?? null;
            $variables = $requestData['variables'] ?? null;

            $res = GraphQLBase::executeQuery($schema, $payload, $this->getResolvers(), null, $variables);
            $output = $res->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ],
            ];
        }
        
        return json_encode($output);
    }

    /**
     * Return an array of GraphQL resolvers.
     *
     * @return array
     */
    private function getResolvers(): array
    {
        return [
            'category' => fn(array $rootValue, array $args) => CategoryResolver::getCategoryPage($rootValue, $args),
            'categories' => fn(array $rootValue, array $args) => CategoryResolver::getCategories($rootValue, $args),
            'product' => fn(array $rootValue, array $args) => ProductResolver::getProductBySku($rootValue, $args),
            'placeOrder' => fn(array $rootValue, array $args) => OrderResolver::placeOrder($rootValue, $args),
        ];
    }
}