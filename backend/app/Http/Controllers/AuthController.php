<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function update(Request $request, $id)
    {
        // // Récupérer l'utilisateur à partir de l'identifiant fourni
        $user = User::findOrFail($id);
    
        // Valider les données de la requête
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'required|string',
            'nationnalite' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
        ]);
    
        // Mettre à jour les champs de l'utilisateur avec les nouvelles données
        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->phone = $request->input('phone');
        $user->nationnalite = $request->input('nationnalite');
        $user->adresse = $request->input('adresse');
        $user->save();

        // Récupérer le profil de l'utilisateur
        $profil = $user->profil;
    
        // Redirection en fonction du profil
        $redirect = '/';
    
        switch ($profil) {
            case 'fournisseur':
                $redirect = '/Fournisseur/dashboard';
                break;
            case 'admin':
                $redirect = '/Admin/dashboard';
                break;
            case 'agent AP':
            case 'fiscaliste':
            case 'agent tresorerie':
            case 'agent BOF':
                        $redirect = '/Agent/dashboard';
                break;
        }
    
        return response()->json([
            'success' => true,
            'message' => 'User information updated successfully',
            'user_id' => $user->id,
            'name' => $user->name,
            'lastname' => $user->lastname,
            'phone' => $user->phone,
            'nationnalite' => $user->nationnalite,
            'adresse' => $user->adresse,
            'profil' => $profil,
            'redirect' => $redirect,
            'user_profil' => $profil
        ]);
    }
}
