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
        Schema::create('fiscalites', function (Blueprint $table) {
            $table->id();
            $table->string('beneficiaire');
            $table->date('date_reception');
            $table->decimal('montant', 10, 2);
            $table->string('objet');
            $table->string('pieces_jointes');
            $table->string('dossier_fiscalite');
            $table->string('num_po')->nullable();
            $table->string('devise');
            $table->date('date_ordre_paiement');
            $table->string('upload_document');
            $table->string('motifs');
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
        Schema::dropIfExists('fiscalites');
    }
};
