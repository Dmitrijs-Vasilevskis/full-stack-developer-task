<?php

namespace App\Models;

use App\Database\Database;

abstract class Model
{
    protected static string $table;
    protected static string $primaryKey = 'id';
    protected array $attributes = [];

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
        $this->fill($attributes);
    }

    public function fill(array $attributes)
    {
        foreach ($attributes as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function __get($key)
    {
        return $this->attributes[$key] ?? null;
    }

    public static function find(int $id): ?self
    {
        $query = "SELECT * FROM " . static::$table . " WHERE " . static::$primaryKey . " = ?";
        $result = Database::fetchOne($query, [$id]);

        return $result ? new static($result) : null;
    }

    public static function first(): Model|null
    {
        $query = "SELECT * FROM " . static::$table . " LIMIT 1";
        $result = Database::fetchOne($query);
        return $result ? new static($result) : null;
    }

    public static function create(array $attributes): ?self
    {
        $id = Database::insert(static::$table, $attributes);

        $record = static::find($id);
        return $record;
    }

    public static function all(): array
    {
        $query = "SELECT * FROM " . static::$table;
        $results = Database::fetchAll($query);

        return array_map(fn($record) => new static($record), $results);
    }

    public static function getTable(): string
    {
        return static::$table;
    }

    public static function where(string $column, string $value): array
    {
        $table = static::$table;
        $query = "SELECT * FROM $table WHERE {$column} = '{$value}'";
        $results = Database::fetchAll($query);

        return array_map(fn($record) => new static($record), $results);
    }


    public function belongsTo(string $relatedModel, string $foreignKey, string $ownerKey = 'id'): ?Model
    {
        $relatedTable = $relatedModel::getTable();
        $query = "SELECT * FROM {$relatedTable} WHERE {$ownerKey} = ?";
        $result = Database::fetchOne($query, [$this->$foreignKey]);

        return $result ? new $relatedModel($result) : null;
    }

    public function hasMany(string $relatedModel, string $foreignKey): array
    {
        $relatedTable = $relatedModel::getTable();
        $query = "SELECT * FROM {$relatedTable} WHERE {$foreignKey} = ?";
        $results = Database::fetchAll($query, [$this->id]);

        return $results ? array_map(fn($record) => new $relatedModel($record), $results) : [];
    }

    public static function with(array $models, string ...$relations): array
    {
        if (empty($models)) {
            return [];
        }

        foreach ($models as $model) {
            foreach ($relations as $relation) {
                if (method_exists($model, $relation)) {
                    $model->attributes[$relation] = $model->$relation();
                }
            }
        }

        return $models;
    }
}
