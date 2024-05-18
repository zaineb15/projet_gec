<?php

// AccessController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Mail\Invitation;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use App\Mail\ConfirmationCodeMail;

class AccessController extends Controller
{
    public function inviterUser(Request $request)
    {
        // Générer une CSRF token
    
        $validatedData = $request->validate([
            'email' => 'required|email',
            'profil' => 'required|string|in:fournisseur,agent tresorerie,fiscaliste,agent AP,agent BOF,admin',
        ]);
    
        // Generate a random password of length 6 starting with 5 random characters
        $password = Str::random(5); 
        
        // Add one random letter to the password
        $password .= chr(rand(97, 122)); // ASCII values for lowercase letters a-z
        
        // Add 2 random numbers to the password
        $password .= rand(10, 99);
        $hashedPassword = Hash::make($password);

        $user = new User();
        $user->email = $request->email; // Set email
        $user->profil = $request->profil; // Set profile
        $user->password = $hashedPassword; // Store hashed password
        $user->save();
    
        // Générer le jeton d'authentification pour le nouvel utilisateur
        $token = $user->createToken('AppName')->accessToken;

        // Stocker le token dans le champ csrf_token
        $user->forceFill([
            'csrf_token' => $token,
        ])->save();
    
        $data = [
            'email' => $request->email,
            'profil' => $request->profil,
            'password' => $password, // Send unhashed password
        ];
    
        Mail::send('emails.invitation', $data, function ($message) use ($data) {
            $message->from('administrateur@chezmoi.com', 'Tunisie Telecom')
                    ->to($data['email'])
                    ->subject('Invitation à la plateforme');
        });
    
        return response()->json(['message' => 'user invité avec succès', 'token' => $token]);
    }
// AccessController.php

public function forgotpassword(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }

    return response()->json(['user_id' => $user->id]);
}
public function passwordreset($id, Request $request)
{
    // Récupérer l'utilisateur à partir de l'identifiant fourni
    $user = User::findOrFail($id);
    $request->validate([
        'mail_recuperation' => 'required|email',
    ]);
    
    $user->mail_recuperation = $request->mail_recuperation; // Mettre à jour l'adresse e-mail de récupération
    
    $confirmationCode = '';
    for ($i = 0; $i < 6; $i++) {
        $confirmationCode .= rand(0, 9); // Concaténer un chiffre aléatoire à la chaîne du code
    }
    $user->confirmation_code = $confirmationCode;
    $user->save();
    
    // Envoyer le code de confirmation par e-mail
    Mail::to($user->mail_recuperation)->send(new ConfirmationCodeMail($confirmationCode));

    return response()->json(['message' => 'Adresse de récupération envoyée avec succès', 'mail_recuperation' => $user->mail_recuperation,'user_id' => $id]);
}
public function confirmCode($id, Request $request)
{
    // Récupérer l'utilisateur à partir de l'identifiant fourni
    $user = User::findOrFail($id);
    $request->validate([
        'confirmationCode' => 'required|numeric', // Assurez-vous que le code de confirmation est un nombre
    ]);

    // Vérifier si le code de confirmation correspond à celui dans la base de données
    if ($user->confirmation_code == $request->confirmationCode) {
        // Le code de confirmation est correct
        return response()->json(['message' => 'Code de confirmation correct'], 200);
    } else {
        // Le code de confirmation est incorrect
        return response()->json(['message' => 'Code de confirmation incorrect'], 400);
    }
}
public function newpassword(Request $request, $id)
{
    $user = User::findOrFail($id);
    
    // Valider les données de la requête
    $request->validate([
        'password' => 'nullable|string|min:8|regex:/^(?=.*[a-zA-Z])(?=.*\d).{8}$/', // Mot de passe facultatif avec validation conditionnelle
    ]);
    // Mettre à jour le mot de passe si un nouveau mot de passe est fourni
    if ($request->has('password')) {
        $user->password = Hash::make($request->input('password')); // Store hashed password
    }

    $user->save();

    return response()->json(['success' => true, 'message' => 'mot de passe modifié avec succès!']);
}

}
