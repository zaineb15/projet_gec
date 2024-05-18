<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class GlobalUserId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            // Récupérer l'ID de l'utilisateur authentifié et le stocker dans une variable de session
            $user = Auth::user(); // Récupérer l'utilisateur authentifié
            $user_id = Auth::id();
            $user_profil = Auth::profil();
            $profil = $user->profil; // Récupérer le profil de l'utilisateur
            session(['user_id' => $user_id]);
            session(['user_profil' => $user_profil]);
        }
 
        return $next($request);
    }
}
