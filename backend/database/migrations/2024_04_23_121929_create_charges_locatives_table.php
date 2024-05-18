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
        Schema::create('charges_locatives', function (Blueprint $table) {
            $table->id();
            $table->string('fournisseur');
            $table->string('id_fiscale');
            $table->string('motifs');
            $table->string('numero_po');
            $table->string('direction');
            $table->date('date_facture');
            $table->decimal('montant', 10, 2);
            $table->string('delai_paiement');
            $table->string('objet');
            $table->string('nature_swm');
            $table->string('structure_ordinatrice');
            $table->string('numero_facture');
            $table->string('devise');
            $table->string('validation');
            $table->string('valide_fisc');
            $table->string('valide_tres');
            $table->string('valide_compt');
            $table->string('user_id');
            $table->date('date_reception');
            $table->string('upload_document');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charges_locatives');
    }
};
