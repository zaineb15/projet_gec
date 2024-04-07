<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class FactureController extends Controller
{
    // Méthode pour créer une nouvelle facture
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $validator = Validator::make($request->all(), [
            'num_fact' => 'required',
            'date_fact' => 'required|date',
            'montant' => 'required|numeric',
            'devise' => 'required|in:TND',
            'file' => 'required|file|mimes:pdf,png,jpg|max:51200',
            'objet' => 'nullable|string', // Mettez à jour la règle de validation pour accepter une chaîne JSON
            'pieces_jointes' => 'nullable|string', // Mettez à jour la règle de validation pour accepter une chaîne JSON
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }
        
        // Enregistrer le fichier
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $file->move(public_path('uploads'), $fileName); 

         // Créer une nouvelle facture
        $facture = Facture::create([
            'num_fact' => $request->input('num_fact'),
            'date_fact' => $request->input('date_fact'),
            'montant' => $request->input('montant'),
            'devise' => $request->input('devise'),
            'file' => 'uploads/' . $fileName,
            'objet' => $request->input('objet'), // Stockez directement la chaîne JSON
            'pieces_jointes' => $request->input('pieces_jointes'), // Stockez directement la chaîne JSON
        ]);

        // Retourner une réponse JSON
        return response()->json(['success' => true, 'facture' => $facture], 201);
    }


    // Méthode pour récupérer la liste des factures
    public function index()
    {
        $factures = Facture::all();
        return response()->json($factures);
    }

    // Méthode pour récupérer une facture spécifique par son ID
    public function show($id)
    {
        $facture = Facture::findOrFail($id);
        return response()->json($facture);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'num_fact' => 'required',
            'date_fact' => 'required',
            'montant' => 'required',
            'devise' => 'required|in:TND', // Spécifier la devise attendue
            'file' => 'required|mimes:pdf,png,jpg|max:2048', // Assurez-vous de modifier la taille maximale selon vos besoins
            'objet' => 'nullable|string', // Mettez à jour la règle de validation pour accepter une chaîne JSON
            'pieces_jointes' => 'nullable|string', // Mettez à jour la règle de validation pour accepter une chaîne JSON
         ]);

        $facture = Facture::findOrFail($id);
        $facture->num_fact = $request->input('num_fact');
        $facture->date_fact = $request->input('date_fact');
        $facture->montant = $request->input('montant');

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/factures', $fileName); // Assurez-vous que le dossier de stockage existe
            $facture->file = $fileName;
        }

        $facture->save();

        return response()->json(['success' => true, 'message' => 'Facture modifiée avec succès!']);
    }
    
    // Méthode pour supprimer une facture
    public function destroy($id)
    {
        $facture = Facture::findOrFail($id);
        $facture->delete();
        return response()->json(['success' => true, 'message' => 'Facture supprimée avec succès']);
    }
}
