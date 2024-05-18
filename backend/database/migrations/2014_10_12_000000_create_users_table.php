<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Mail\ConfirmationCodeMail;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->string('password');
            $table->string('remember_token')->nullable();
            $table->string('profil')->nullable();
            $table->integer('direction')->nullable();
            $table->string('isactive');
            $table->string('image')->nullable();
            $table->string('phone')->nullable();
            $table->string('created_by')->nullable();
            $table->timestamps();
            $table->string('lastname');
            $table->string('adresse');
            $table->string('nationnalite');
            $table->string('mail_recuperation');
            $table->string('confirmation_code');
            
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
