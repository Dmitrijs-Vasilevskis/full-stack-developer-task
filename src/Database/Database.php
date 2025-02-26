<?php

declare(strict_types=1);

namespace App\Database;

use PDO;
use PDOException;
use PhpDevCommunity\DotEnv;
use PDOStatement;

class Database
{
    private static ?PDO $connection = null;
    private const ENV_FILE = __DIR__ . '/../../.env';
    private const DB_HOST = 'DB_HOST';
    private const DB_NAME = 'DB_NAME';
    private const DB_USER = 'DB_USER';
    private const DB_PASS = 'DB_PASS';
    private const DB_PORT = 'DB_PORT';

    private static array $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    private function __construct() {}

    public static function getConnection(): PDO
    {
        if (!self::$connection) {
            // Load .env variables once
            (new DotEnv(self::ENV_FILE))->load();

            try {
                self::$connection = new PDO(
                    'mysql:host=' . getenv(self::DB_HOST) .
                        ';dbname=' . getenv(self::DB_NAME) .
                        ';port=' . getenv(self::DB_PORT) .
                        ';charset=utf8mb4',
                    getenv(self::DB_USER),
                    getenv(self::DB_PASS),
                    self::$options
                );
            } catch (PDOException $e) {
                throw new PDOException('Database connection failed: ' . $e->getMessage());
            }
        }
        return self::$connection;
    }

    public static function query(string $query, array $params = []): PDOStatement
    {
        $stmt = self::getConnection()->prepare($query);
        $stmt->execute($params);
        return $stmt;
    }

    public static function fetchAll(string $query, array $params = []): array
    {
        return self::query($query, $params)->fetchAll();
    }

    public static function fetchOne(string $query, array $params = []): array|false
    {
        return self::query($query, $params)->fetch();
    }

    public static function insert(string $table, array $data): int
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        $query = "INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})";

        self::query($query, array_values($data));
        return (int) self::getConnection()->lastInsertId();
    }

    public static function update(string $table, array $data, string $condition, array $conditionParams = []): bool|string
    {
        $setClause = implode(', ', array_map(fn($col) => "{$col} = ?", array_keys($data)));
        $query = "UPDATE {$table} SET {$setClause} WHERE {$condition}";

        self::query($query, array_merge(array_values($data), $conditionParams));
        return self::getConnection()->lastInsertId();
    }

    public static function delete(string $table, string $condition, array $conditionParams = []): bool|string
    {
        $query = "DELETE FROM {$table} WHERE {$condition}";
        self::query($query, $conditionParams);
        return self::getConnection()->lastInsertId();
    }

    public static function rawQuery(string $query): bool
    {
        return self::getConnection()->exec($query) !== false;
    }
}
