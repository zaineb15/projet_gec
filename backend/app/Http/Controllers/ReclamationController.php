<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reclamation;
use App\Models\User;

class ReclamationController extends Controller
{
    public function index1()
    {
        // Récupérer toutes les réclamations avec les détails de l'utilisateur
        $reclamations = Reclamation::with('user')->get();
        return response()->json($reclamations);
    }
    public function index(Request $request)
    {
        // Récupérer user_id de la requête GET
        $user_id = $request->query('user_id');
    
        // Rechercher les réclamations de l'utilisateur spécifique
        $reclamations = Reclamation::where('user_id', $user_id)->get();
    
        // Retourner les réclamations sous forme de réponse JSON
        return response()->json($reclamations);
    }
    

    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'objet' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $reclamation = Reclamation::create($request->all());

        return response()->json([
            'user_id' => $user_id,
            'success' => true,
            'message' => 'Réclamation créée avec succès!',
            'reclamation' => $reclamation
        ]);
    }

    public function show($id)
    {
        $reclamation = Reclamation::find($id);
        
        if (!$reclamation) {
            return response()->json([
                'success' => false,
                'message' => 'Réclamation non trouvée!'
            ], 404);
        }
        
        return response()->json($reclamation);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'objet' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $reclamation = Reclamation::findOrFail($id);
        $reclamation->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Réclamation mise à jour avec succès!',
            'reclamation' => $reclamation
        ]);
    }

    public function destroy($id)
    {
        $reclamation = Reclamation::findOrFail($id);
        $reclamation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Réclamation supprimée avec succès!'
        ]);
    }
    public function updateStatus(Request $request, $id)
    {
        $reclamation = Reclamation::findOrFail($id);
        $reclamation->update($request->only('status'));
        return response()->json($reclamation);
    }
    public function countReceivedReclamations()
{
    // Compter les réclamations avec le statut "Reçue"
    $count = Reclamation::where('status', 'Reçue')->count();
    
    // Retourner le nombre de réclamations "Reçue"
    return response()->json(['count' => $count]);
}
public function ReceivedReclamations()
{
    // Compter les réclamations avec le statut "Reçue"
    $reclamations = Reclamation::where('status', 'Reçue')->select('id')->get();
    
    // Retourner le nombre de réclamations "Reçue"
    return response()->json(['reclamations' => $reclamations]);
}
}
