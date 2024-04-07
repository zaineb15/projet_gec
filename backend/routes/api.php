<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\LoginController; // Import LoginController
use App\Http\Controllers\UserController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']); // Use LoginController here

Route::apiResource('factures', FactureController::class);

Route::post('/facture', [FactureController::class, 'store']);
Route::get('/facture', [FactureController::class, 'index']);
Route::get('/facture/{id}', [FactureController::class, 'show']);
Route::post('/facture/{id}', [FactureController::class, 'update']);
Route::delete('/facture/{id}', [FactureController::class, 'destroy']);

// Routes pour les réclamations
Route::apiResource('reclamations', ReclamationController::class);

// Routes pour les réclamations
Route::post('/reclamation', [ReclamationController::class, 'store']); // Créer une nouvelle réclamation
Route::get('/reclamation/{id}', [ReclamationController::class, 'show']); // Afficher une réclamation spécifique
Route::put('/reclamation/{id}', [ReclamationController::class, 'update']); // Mettre à jour une réclamation existante
Route::delete('/reclamation/{id}', [ReclamationController::class, 'destroy']); // Supprimer une réclamation
Route::get('/reclamation', [ReclamationController::class, 'index']); // Récupérer toutes les réclamations


