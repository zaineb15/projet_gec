<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\LoginController; // Import LoginController
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\DeconnexionController;
use App\Http\Controllers\FondRoulementController;
use App\Http\Controllers\ChargesLocativesController;
use App\Http\Controllers\ChargesSocialesController;
use App\Http\Controllers\CommissionDistributionController;
use App\Http\Controllers\DeviseeController;
use App\Http\Controllers\FinancementController;
use App\Http\Controllers\FiscaliteController;
use App\Http\Controllers\LettreCreditController;
use App\Http\Controllers\OperateurController;
use App\Http\Controllers\StegController;
use App\Http\Controllers\VentilationController;
use App\Http\Controllers\BordereauController;
use App\Http\Controllers\MotifsController;
use App\Http\Controllers\ValidationController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CustomAuthMiddleware;


Route::post('/register/{id}', [AuthController::class, 'update']); // Use LoginController here
Route::post('/login', [LoginController::class, 'login']); // Use LoginController here
Route::post('/deconnexion/{id}', [DeconnexionController::class, 'deconnexion']);
Route::middleware(CustomAuthMiddleware::class)->group(function () {

Route::apiResource('factures', FactureController::class);
// Route pour envoyer le code de réinitialisation de mot de passe
Route::post('/forgotpassword', [AccessController::class, 'forgotpassword']);
Route::post('/reset-password/{id}', [AccessController::class, 'passwordreset']);
Route::post('/confirm-code/{id}', [AccessController::class, 'confirmCode']);
Route::post('/newpassword/{id}', [AccessController::class, 'newpassword']);

Route::get('/countCurrentFactures', [FactureController::class, 'countCurrentFactures']);
Route::get('/countvalidebof', [FactureController::class, 'countValidebof']);
Route::get('/countvalidecompt', [FactureController::class, 'countValidecompt']);
Route::get('/countvalidefisc', [FactureController::class, 'countvalidefisc']);
Route::get('/countValidatedFactures', [FactureController::class, 'countValidetres']);
Route::get('/countFacturesRejetees', [FactureController::class, 'countFacturesRejetees']);
Route::post('/facture', [FactureController::class, 'store']);
Route::get('/countFacturesByDay', [FactureController::class, 'countFacturesByDay']);
Route::get('/facture', [FactureController::class, 'index']);
Route::get('/facture/{id}', [FactureController::class, 'show']);
Route::post('/facture/{id}', [FactureController::class, 'update']);
Route::delete('/facture/{id}', [FactureController::class, 'destroy']);
Route::put('/factures/{id}/status', [FactureController::class, 'updateStatus']);
Route::get('/factureold', [FactureController::class, 'getPastDateFactures']);
Route::get('/facturenew', [FactureController::class, 'getCurrentDateFactures']);
Route::post('/facture/{id}/motif', [MotifsController::class, 'store7']);
Route::get('/getAllMotifs', [MotifsController::class, 'getAllMotifs']);
Route::post('/facture/{id}/validation', [ValidationController::class, 'store7']);

// Routes pour les réclamations
Route::apiResource('reclamations', ReclamationController::class);

// Routes pour les réclamations
Route::get('/ReceivedReclamations', [ReclamationController::class, 'ReceivedReclamations']); // Créer une nouvelle réclamation
Route::get('/countReceivedReclamations', [ReclamationController::class, 'countReceivedReclamations']); // Créer une nouvelle réclamation
Route::post('/reclamation', [ReclamationController::class, 'store']); // Créer une nouvelle réclamation
Route::get('/reclamation/{id}', [ReclamationController::class, 'show']); // Afficher une réclamation spécifique
Route::put('/reclamation/{id}', [ReclamationController::class, 'update']); // Mettre à jour une réclamation existante
Route::delete('/reclamation/{id}', [ReclamationController::class, 'destroy']); // Supprimer une réclamation
Route::get('/reclamation', [ReclamationController::class, 'index']); // Récupérer toutes les réclamations
Route::get('/reclamationall', [ReclamationController::class, 'index1']); // Récupérer toutes les réclamations
Route::put('/reclamations/{id}/status', [ReclamationController::class, 'updateStatus']);

Route::post('/user-access', [AccessController::class, 'inviterUser']);

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/user/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::get('/active-users-count', [UserController::class, 'countActiveUsers']);

//type facture 
Route::post('/countCurrentFondRoulements', [FondRoulementController::class, 'countCurrentFondRoulements']);
Route::post('/fond-roulement', [FondRoulementController::class, 'store']);
Route::get('/current-date-facturesfr', [FondRoulementController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturesfr', [FondRoulementController::class, 'getPastDateFactures']);
Route::post('/fond-roulement/{id}/motif', [MotifsController::class, 'store4']);
Route::post('/fond-roulement/{id}/validation', [ValidationController::class, 'store4']);
Route::get('/current-date-facturesfr/{id}', [FondRoulementController::class, 'show']);
Route::post('/fond-roulement/{id}', [FondRoulementController::class, 'update']);
Route::delete('/fond-roulement/{id}', [FondRoulementController::class, 'destroy']);

Route::post('/countCurrentChargesLocatives', [ChargesLocativesController::class, 'countCurrentChargesLocatives']);
Route::post('/charges-locatives', [ChargesLocativesController::class, 'store']);
Route::get('/current-date-facturescl', [ChargesLocativesController::class, 'getCurrentDateFactures']);
Route::get('/current-date-facturescl/{id}', [ChargesLocativesController::class, 'show']);
Route::get('/past-date-facturescl', [ChargesLocativesController::class, 'getPastDateFactures']);
Route::post('/charges-locatives/{id}/motif', [MotifsController::class, 'store10']);
Route::post('/charges-locatives/{id}/validation', [ValidationController::class, 'store10']);
Route::post('/charges-locatives/{id}', [ChargesLocativesController::class, 'update']);
Route::delete('/charges-locatives/{id}', [ChargesLocativesController::class, 'destroy']);

Route::post('/countCurrentChargesSocialess', [ChargesSocialesController::class, 'countCurrentChargesSocialess']);
Route::post('/charges-sociales', [ChargesSocialesController::class, 'store']);
Route::get('/current-date-facturescs', [ChargesSocialesController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturescs', [ChargesSocialesController::class, 'getPastDateFactures']);
Route::get('/current-date-facturescs/{id}', [ChargesSocialesController::class, 'show']);
Route::post('/charges-sociales/{id}/motif', [MotifsController::class, 'store9']);
Route::post('/charges-sociales/{id}/validation', [ValidationController::class, 'store9']);
Route::post('/charges-sociales/{id}', [ChargesSocialesController::class, 'update']);
Route::delete('/charges-sociales/{id}', [ChargesSocialesController::class, 'destroy']);

Route::post('/countCurrentCommissionDistributions', [CommissionDistributionController::class, 'countCurrentCommissionDistributions']);
Route::post('/commission-distribution', [CommissionDistributionController::class, 'store']);
Route::get('/current-date-facturescd', [CommissionDistributionController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturescd', [CommissionDistributionController::class, 'getPastDateFactures']);
Route::get('/current-date-facturescd/{id}', [CommissionDistributionController::class, 'show']);
Route::post('/commission-distribution/{id}/motif', [MotifsController::class, 'store11']);
Route::post('/commission-distribution/{id}/validation', [ValidationController::class, 'store11']);
Route::post('/commission-distribution/{id}', [CommissionDistributionController::class, 'update']);
Route::delete('/commission-distribution/{id}', [CommissionDistributionController::class, 'destroy']);

Route::post('/countCurrentDevisees', [DeviseeController::class, 'countCurrentDevisees']);
Route::post('/devisee', [DeviseeController::class, 'store']);
Route::get('/current-date-facturesd', [DeviseeController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturesd', [DeviseeController::class, 'getPastDateFactures']);
Route::post('/devisee/{id}/motif', [MotifsController::class, 'store8']);
Route::post('/devisee/{id}/validation', [ValidationController::class, 'store8']);
Route::get('/current-date-facturesd/{id}', [DeviseeController::class, 'show']);
Route::post('/devisee/{id}', [DeviseeController::class, 'update']);
Route::delete('/devisee/{id}', [DeviseeController::class, 'destroy']);

Route::post('/financement', [FinancementController::class, 'store']);
Route::post('/countCurrentFinancements', [FinancementController::class, 'countCurrentFinancements']);
Route::get('/current-date-facturesf', [FinancementController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturesf', [FinancementController::class, 'getPastDateFactures']);
Route::post('/financement/{id}/motif', [MotifsController::class, 'store6']);
Route::post('/financement/{id}/validation', [ValidationController::class, 'store6']);
Route::get('/current-date-facturesf/{id}', [FinancementController::class, 'show']);
Route::post('/financement/{id}', [FinancementController::class, 'update']);
Route::delete('/financement/{id}', [FinancementController::class, 'destroy']);

Route::post('/countCurrentFiscalites', [FiscaliteController::class, 'countCurrentFiscalites']);
Route::post('/fiscalite', [FiscaliteController::class, 'store']);
Route::get('/current-date-facturesfs', [FiscaliteController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturesfs', [FiscaliteController::class, 'getPastDateFactures']);
Route::post('/fiscalite/{id}/motif', [MotifsController::class, 'store5']);
Route::post('/fiscalite/{id}/validation', [ValidationController::class, 'store5']);
Route::get('/current-date-facturesfs/{id}', [FiscaliteController::class, 'show']);
Route::post('/fiscalite/{id}', [FiscaliteController::class, 'update']);
Route::delete('/fiscalite/{id}', [FiscaliteController::class, 'destroy']);

Route::post('/countCurrentLettreCredits', [LettreCreditController::class, 'countCurrentLettreCredits']);
Route::post('/lettre-credit', [LettreCreditController::class, 'store']);
Route::get('/current-date-factureslc', [LettreCreditController::class, 'getCurrentDateFactures']);
Route::get('/past-date-factureslc', [LettreCreditController::class, 'getPastDateFactures']);
Route::post('/lettre-credit/{id}/motif', [MotifsController::class, 'store1']);
Route::post('/lettre-credit/{id}/validation', [ValidationController::class, 'store1']);
Route::get('/current-date-factureslc/{id}', [LettreCreditController::class, 'show']);
Route::post('/lettre-credit/{id}', [LettreCreditController::class, 'update']);
Route::delete('/lettre-credit/{id}', [LettreCreditController::class, 'destroy']);

Route::post('/countCurrentOperateurs', [OperateurController::class, 'countCurrentOperateurs']);
Route::post('/operateur', [OperateurController::class, 'store']);
Route::get('/current-date-factureso', [OperateurController::class, 'getCurrentDateFactures']);
Route::get('/past-date-factureso', [OperateurController::class, 'getPastDateFactures']);
Route::post('/operateur/{id}/motif', [MotifsController::class, 'store3']);
Route::post('/operateur/{id}/validation', [ValidationController::class, 'store3']);
Route::get('/current-date-factureso/{id}', [OperateurController::class, 'show']);
Route::post('/operateur/{id}', [OperateurController::class, 'update']);
Route::delete('/operateur/{id}', [OperateurController::class, 'destroy']);

Route::post('/countCurrentStegs', [StegController::class, 'countCurrentStegs']);
Route::post('/steg', [StegController::class, 'store']);
Route::get('/current-date-factures', [StegController::class, 'getCurrentDateFactures']);
Route::get('/past-date-factures', [StegController::class, 'getPastDateFactures']);
Route::post('/steg/{id}/motif', [MotifsController::class, 'store']);
Route::post('/steg/{id}/validation', [ValidationController::class, 'store']);
Route::get('/current-date-factures/{id}', [StegController::class, 'show']);
Route::post('/steg/{id}', [StegController::class, 'update']);
Route::delete('/steg/{id}', [StegController::class, 'destroy']);

Route::post('/ventilation', [VentilationController::class, 'store']);
Route::post('/countCurrentVentilations', [VentilationController::class, 'countCurrentVentilations']);
Route::get('/current-date-facturesv', [VentilationController::class, 'getCurrentDateFactures']);
Route::get('/past-date-facturesv', [VentilationController::class, 'getPastDateFactures']);
Route::post('/ventilation/{id}/motif', [MotifsController::class, 'store2']);
Route::post('/ventilation/{id}/validation', [ValidationController::class, 'store2']);
Route::get('/current-date-facturesv/{id}', [VentilationController::class, 'show']);
Route::post('/ventilation/{id}', [VentilationController::class, 'update']);
Route::delete('/ventilation/{id}', [VentilationController::class, 'destroy']);

Route::get('/bordereaux', [BordereauController::class, 'getAllBordereaux']);
Route::get('/older-bordereaux', [BordereauController::class, 'getOlderBordereaux']);
});