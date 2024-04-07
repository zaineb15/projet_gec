<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reclamation;

class ReclamationController extends Controller
{
    public function index()
    {
        $reclamations = Reclamation::all();
        return response()->json($reclamations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'objet' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $reclamation = Reclamation::create($request->all());

        return response()->json([
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
}
