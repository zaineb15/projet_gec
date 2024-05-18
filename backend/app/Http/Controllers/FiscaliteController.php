<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fiscalite;
use Carbon\Carbon;

class FiscaliteController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Fiscalite::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Fiscalite::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Fiscalite::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = Fiscalite::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{$factures = Fiscalite::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }}}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $factures = Fiscalite::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id){
        $Fiscalite = Fiscalite::findOrFail($id);
        return response()->json($Fiscalite);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'beneficiaire' => 'required|string',
            'date_reception' => 'required|date',
            'montant' => 'required|numeric',
            'objet' => 'required|string',
            'dossier_fiscalite' => 'required|string',
            'num_po' => 'nullable|string',
            'devise' => 'required|string',
            'date_ordre_paiement' => 'required|date',
            'upload_document' => 'required|file|mimes:pdf,png,jpg',
        ]);

        // Gérez le fichier téléchargé
        $file = $request->file('upload_document');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        // Créez une nouvelle instance de Fiscalite
        $fiscalite = new Fiscalite;
        $fiscalite->beneficiaire = $request->beneficiaire;
        $fiscalite->date_reception = $request->date_reception;
        $fiscalite->montant = $request->montant;
        $fiscalite->objet = $request->objet;
        $fiscalite->dossier_fiscalite = $request->dossier_fiscalite;
        $fiscalite->num_po = $request->num_po;
        $fiscalite->devise = $request->devise;
        $fiscalite->date_ordre_paiement = $request->date_ordre_paiement;
        $fiscalite->upload_document = $filePath;
        $fiscalite->user_id = $request->user_id;
        $fiscalite->save();

        return response()->json(['success' => true, 'message' => 'Facture créée avec succès']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'beneficiaire' => 'required|string',
            'date_reception' => 'required|date',
            'montant' => 'required|numeric',
            'objet' => 'required|string',
            'dossier_fiscalite' => 'required|string',
            'num_po' => 'nullable|string',
            'devise' => 'required|string',
            'date_ordre_paiement' => 'required|date',
            'upload_document' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Trouver la fiscalité à mettre à jour
        $fiscalite = Fiscalite::findOrFail($id);

        // Mettre à jour les attributs de la fiscalité
        $fiscalite->beneficiaire = $request->input('beneficiaire');
        $fiscalite->date_reception = $request->input('date_reception');
        $fiscalite->montant = $request->input('montant');
        $fiscalite->objet = $request->input('objet');
        $fiscalite->dossier_fiscalite = $request->input('dossier_fiscalite');
        $fiscalite->num_po = $request->input('num_po');
        $fiscalite->devise = $request->input('devise');
        $fiscalite->date_ordre_paiement = $request->input('date_ordre_paiement');

        // Gérer le téléchargement des fichiers si un nouveau fichier est fourni
        if ($request->hasFile('upload_document')) {
            $uploadDocumentPath = $request->file('upload_document')->store('uploads');
            $fiscalite->upload_document = $uploadDocumentPath;
        }

        // Sauvegarder les modifications apportées à la fiscalité
        $fiscalite->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Fiscalité mise à jour avec succès!',
        ]);
    }

    /**
     * Supprime la fiscalité spécifiée du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver la fiscalité à supprimer
        $fiscalite = Fiscalite::findOrFail($id);

        // Supprimer la fiscalité de la base de données
        $fiscalite->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Fiscalité supprimée avec succès!',
        ]);
    }
    public function countCurrentFiscalites()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = Fiscalite::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de Fiscalites pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
