<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('charges_sociales', function (Blueprint $table) {
            $table->id();
            $table->string('fournisseur');
            $table->string('motifs');
            $table->date('date_reception');
            $table->decimal('montant', 10, 2);
            $table->string('objet');
            $table->string('dossier_fiscalite');
            $table->string('numero_op');
            $table->string('devise');
            $table->date('date_ordre_paiement');
            $table->string('upload_document');
            $table->string('validation');
            $table->string('user_id');
            $table->string('valide_fisc');
            $table->string('valide_tres');
            $table->string('valide_compt');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('charges_sociales');
    }
};
