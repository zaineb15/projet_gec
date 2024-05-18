<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('commission_distributions', function (Blueprint $table) {
            $table->id();
            $table->string('commission');
            $table->string('fournisseur');
            $table->string('id_fiscale');
            $table->string('motifs');
            $table->date('date_facture');
            $table->date('date_rec');
            $table->json('objet');
            $table->json('pieces_jointes');
            $table->decimal('montant', 10, 2);
            $table->string('devise');
            $table->string('num_facture');
            $table->string('delai_paiement');
            $table->string('upload_document')->nullable(); // Champ ajouté pour gérer le fichier téléchargé
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
        Schema::dropIfExists('commission_distribution');
    }
};
