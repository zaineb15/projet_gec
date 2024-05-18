<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // Stocker l'ID de l'utilisateur dans la session
            Session::put('user_id', $user->id);
            Session::put('user_profil', $user->profil);

            // Générer un jeton d'accès
            $token = $user->createToken('AppName')->accessToken;
            
        }
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
        ]);    }
        
}
