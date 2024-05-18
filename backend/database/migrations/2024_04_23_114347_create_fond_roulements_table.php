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
        Schema::create('fond_roulements', function (Blueprint $table) {
            $table->id();
            $table->string('num_facture');
            $table->string('motifs');
            $table->string('num_po')->nullable();
            $table->date('date_facture');
            $table->decimal('montant');
            $table->string('devise');
            $table->json('objet');
            $table->json('pieces_jointes');
            $table->string('file_path')->nullable();
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
        Schema::dropIfExists('fond_roulements');
    }
};
