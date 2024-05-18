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
        Schema::create('devisees', function (Blueprint $table) {
            $table->id();
            $table->string('montant');
            $table->json('objet');
            $table->string('idFiscale');
            $table->date('dateFacture');
            $table->string('delaiPaiement');
            $table->string('nature3wm');
            $table->string('fournisseur');
            $table->string('numeroFacture');
            $table->string('devise');
            $table->date('dateReception');
            $table->string('motifs');
            $table->string('uploadDocument');
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
        Schema::dropIfExists('devisees');
    }
};
