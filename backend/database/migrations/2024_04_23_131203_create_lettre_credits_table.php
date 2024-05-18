<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lettre_credits', function (Blueprint $table) {
            $table->id();
            $table->string('numeroOP');
            $table->string('idFiscale');
            $table->date('dateFacture');
            $table->decimal('montant', 10, 2);
            $table->string('objet');
            $table->string('nature3WM');
            $table->string('numeroFacture');
            $table->string('devise');
            $table->date('dateReception');
            $table->string('motifs');
            $table->string('uploadDocument')->nullable();
            $table->string('validation');
            $table->string('user_id');
            $table->string('valide_fisc');
            $table->string('valide_tres');
            $table->string('valide_compt');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lettre_credits');
    }
};
