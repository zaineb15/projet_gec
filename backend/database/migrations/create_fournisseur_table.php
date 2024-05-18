<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fournisseurs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->nullable();
            $table->string('username', 255)->nullable();
            $table->string('idfiscale', 50)->nullable();
            $table->text('adresse')->nullable();
            $table->string('nationnalite', 255)->nullable();
            $table->string('created_by', 50)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate();
            $table->string('email', 255)->nullable();
            $table->string('password', 255)->nullable();
            // Ajoutez vos autres champs ici...
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fournisseurs');
    }
};
