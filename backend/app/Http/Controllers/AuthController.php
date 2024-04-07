<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8', // Longueur minimale de 8 caractères
                'regex:/^(?=.*[a-zA-Z]).{8,}$/' // Au moins 8 caractères alphabétiques
            ],
            'phone' => 'required|string',
            'profil' => 'required|string|in:fournisseur,comptable,agent_bof',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'phone' => $request->input('phone'),
            'profil' => $request->input('profil'),
        ]);

        // Générer le jeton d'authentification pour le nouvel utilisateur
        $token = $user->createToken('AppName')->accessToken;

        return response()->json(['success' => true, 'message' => 'User registered successfully', 'access_token' => $token], 201);
    }
}
