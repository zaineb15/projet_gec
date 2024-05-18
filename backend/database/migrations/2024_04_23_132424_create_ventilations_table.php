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
        Schema::create('ventilations', function (Blueprint $table) {
            $table->id();
            $table->string('beneficiaire');
            $table->date('date_ordre_paiement');
            $table->string('direction');
            $table->date('date_reception');
            $table->string('objet');
            $table->string('pieces_jointes');
            $table->string('ventilation_direct');
            $table->string('ordre_paiement');
            $table->string('structure_ordinatrice');
            $table->string('devise');
            $table->string('montant');
            $table->string('motifs');
            $table->string('upload_document');
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
        Schema::dropIfExists('ventilations');
    }
};
