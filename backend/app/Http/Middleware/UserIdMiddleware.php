<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserIdMiddleware
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
            // Récupérer l'ID de l'utilisateur
            $user_id = $user->id;

            // Passer l'ID de l'utilisateur à toutes les vues
            view()->share('user_id', $user_id);
        }

        return $next($request);
    }
}