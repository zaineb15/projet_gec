<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AppName')->accessToken;

            // Redirection en fonction du profil
            $redirect = '/';

            switch ($user->profil) {
                case 'fournisseur':
                    $redirect = '/fournisseur/dashboard';
                    break;
                case 'comptable':
                    $redirect = '/comptable/dashboard';
                    break;
                case 'agent_bof':
                    $redirect = '/agent_bof/dashboard';
                    break;
            }

            return response()->json(['success' => true, 'message' => 'Login successful', 'access_token' => $token, 'redirect' => $redirect]);
        }

        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }
}
