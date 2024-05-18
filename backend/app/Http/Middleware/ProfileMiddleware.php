<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ProfileMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Vérifier si l'utilisateur est authentifié
        if ($user) {
            // Récupérer le profil de l'utilisateur
            $user_profil = $user->profil;

            // Passer le profil à toutes les vues
            view()->share('user_profil', $user_profil);
        }

        return $next($request);
    }
}
