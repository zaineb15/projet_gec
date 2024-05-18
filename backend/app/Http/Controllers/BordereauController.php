<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bordereau;
use Carbon\Carbon;

class BordereauController extends Controller
{
    public function getAllBordereaux()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->startOfDay();

        // Récupérer les bordereaux pour la date actuelle
        $bordereaux = Bordereau::whereDate('created_at', $dateActuelle)->get();

        // Retourner les bordereaux en tant que réponse JSON
        return response()->json(['success' => true, 'bordereaux' => $bordereaux]);
    }

    public function getOlderBordereaux()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->startOfDay();

        // Récupérer les bordereaux créés avant la date actuelle
        $bordereaux = Bordereau::whereDate('created_at', '<', $dateActuelle)->get();

        // Retourner les bordereaux en tant que réponse JSON
        return response()->json(['success' => true, 'bordereaux' => $bordereaux]);
    }
}

