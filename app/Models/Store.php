<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    /**
     * Los atributos que pueden asignarse en masa.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'phone',
        'address',
        'email',
        'rut',
        'status',
    ];

    /**
     * Obtiene los usuarios asociados a la tienda.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function mercadoPagoAccount()
    {
        return $this->hasOne(MercadoPagoAccount::class);
    }
}
