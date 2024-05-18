<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FournisseurController extends Controller
{
    public function inviterFournisseur(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
        ]);
    
        $username = $this->generateUniqueUsername();
        $password = Str::random(8);

        $hashedPassword = Hash::make($password);

        $fournisseur = new Fournisseur();
        $fournisseur->email = $validatedData['email'];
        $fournisseur->name = $validatedData['name'];
        $fournisseur->username = $username;
        $fournisseur->password = $hashedPassword; // Stocker le mot de passe haché
        $fournisseur->save();
    
        $data = [
            'email' => $fournisseur->email,
            'name' => $fournisseur->name,
            'username' => $fournisseur->username,
            'password' => $password, // Passer le mot de passe non crypté
        ];
    
        Mail::send('emails.invitation', $data, function ($message) use ($data) {
            $message->from('administrateur@chezmoi.com', 'Tunisie Telecom')
                    ->to($data['email'])
                    ->subject('Invitation à la plateforme');
        });
    
        return response()->json(['message' => 'Fournisseur invité avec succès']);
    }
    

    private function generateUniqueUsername()
    {
        $username = Str::random(8); // Générer un nom d'utilisateur aléatoire

        // Vérifier si le nom d'utilisateur est unique
        $existing = DB::table('fournisseurs')->where('username', $username)->exists();
        
        // S'il existe déjà, générer un autre nom d'utilisateur
        while ($existing) {
            $username = Str::random(8);
            $existing = DB::table('fournisseurs')->where('username', $username)->exists();
        }

        return $username;
    }
}
