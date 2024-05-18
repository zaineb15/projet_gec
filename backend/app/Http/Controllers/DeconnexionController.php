<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DeconnexionController extends Controller
{
    public function deconnexion(Request $request, $id)
    {
        $user = User::findOrFail($id);
    
        // Mettre à jour is_active à 0
        $user->isactive = 0;
        $user->save();
            Auth::logout(); // Déconnexion de l'utilisateur
        
        return response()->json(['message' => 'Déconnexion réussie.']);
    }
}
