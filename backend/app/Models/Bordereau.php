<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bordereau extends Model
{
    protected $fillable = ['reference', 'nature', 'status', 'folder', 'sent_at', 'sent_by', 'created_by'];

    public function typeFacture()
    {
        return $this->belongsTo(TypeFacture::class, 'nature', 'nom');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($bordereau) {
            $bordereau->status = 'En cours';
        });
    }

    public function updateStatus()
    {
        if ($this->created_at->lt(now())) {
            $this->status = 'Clôturé';
            $this->save();
        }
    }
}

