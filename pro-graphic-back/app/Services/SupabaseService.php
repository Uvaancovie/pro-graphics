<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class SupabaseService
{
    protected string $url;
    protected string $key;

    public function __construct()
    {
        $this->url = rtrim(config('services.supabase.url'), '/') . '/rest/v1';
        $this->key = config('services.supabase.service_role_key') ?: config('services.supabase.anon_key');
    }

    protected function headers(): array
    {
        return [
            'apikey' => $this->key,
            'Authorization' => 'Bearer ' . $this->key,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Prefer' => 'return=representation',
        ];
    }

    protected function client(): PendingRequest
    {
        $client = Http::withHeaders($this->headers());

        if (file_exists('C:/php/cacert.pem')) {
            $client->withOptions(['verify' => 'C:/php/cacert.pem']);
        }

        return $client;
    }

    public function getAll(string $table, array $params = []): array
    {
        $response = $this->client()->get("{$this->url}/{$table}", $params);

        return $response->json() ?? [];
    }

    public function getById(string $table, int|string $id, string $column = 'id'): ?array
    {
        $response = $this->client()->get("{$this->url}/{$table}", [
            "{$column}" => "eq.{$id}",
            'select' => '*',
        ]);

        $data = $response->json();

        return $data[0] ?? null;
    }

    public function create(string $table, array $data, ?string $onConflict = null): ?array
    {
        $url = "{$this->url}/{$table}";
        if ($onConflict) {
            $url .= "?on_conflict={$onConflict}";
        }

        $response = $this->client()->post($url, $data);

        $result = $response->json();

        return is_array($result) ? $result : null;
    }

    public function update(string $table, int|string $id, array $data, string $column = 'id'): array
    {
        $response = $this->client()->patch("{$this->url}/{$table}", $data, [
            "{$column}" => "eq.{$id}",
        ]);

        return $response->json() ?? [];
    }

    public function delete(string $table, int|string $id, string $column = 'id'): array
    {
        $response = $this->client()->delete("{$this->url}/{$table}", [
            "{$column}" => "eq.{$id}",
        ]);

        return $response->json() ?? [];
    }

    public function raw(string $method, string $table, array $options = []): array
    {
        $response = $this->client()->{$method}("{$this->url}/{$table}", $options);

        return $response->json() ?? [];
    }
}
