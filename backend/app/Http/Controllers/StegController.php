<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Steg;
use Carbon\Carbon;

class StegController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCurrentDateFactures(Request $request)
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Steg::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Steg::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Steg::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = Steg::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{$factures = Steg::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
    
        // Retourner les factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $factures]);
       
    }}}}}
    
    public function getPastDateFactures()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
    
        // Récupérer les factures antérieures à la date actuelle
        $factures = Steg::whereDate('created_at', '<', $dateActuelle)->get();
    
        // Retourner les factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id)
    {
        $Steg = Steg::findOrFail($id);
        return response()->json($Steg);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        // Valider les données du formulaire
        $request->validate([
            'montant' => 'required',
            'devise' => 'required',
            'date_facture' => 'required|date',
            'objet' => 'required',
            'numero_po' => 'required',
            'id_fiscale' => 'required',
            'direction' => 'required',
            'fournisseur' => 'required',
            'delai_paiement' => 'required',
            'structure_ordinatrice' => 'required',
            'numero_facture' => 'required',
            'date_reception' => 'required|date',
            'upload_document' => 'required|file',
            'nature_3wm' => 'required',
        ]);

        // Gérer le téléchargement des fichiers
        $uploadDocumentPath = $request->file('upload_document')->store('upload_documents');

        // Créer une nouvelle instance du modèle Steg
        $steg = new Steg([
            'montant' => $request->input('montant'),
            'devise' => $request->input('devise'),
            'date_facture' => $request->input('date_facture'),
            'objet' => $request->input('objet'),
            'numero_po' => $request->input('numero_po'),
            'id_fiscale' => $request->input('id_fiscale'),
            'direction' => $request->input('direction'),
            'fournisseur' => $request->input('fournisseur'),
            'delai_paiement' => $request->input('delai_paiement'),
            'structure_ordinatrice' => $request->input('structure_ordinatrice'),
            'numero_facture' => $request->input('numero_facture'),
            'date_reception' => $request->input('date_reception'),
            'upload_document' => $uploadDocumentPath,
            'nature_3wm' => $request->input('nature_3wm'),
            'user_id' => $request->input('user_id'),

        ]);

        // Sauvegarder le modèle Steg dans la base de données
        $steg->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Facture créée avec succès!',
        ]);
    }
    public function update(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'montant' => 'required',
            'devise' => 'required',
            'date_facture' => 'required|date',
            'objet' => 'required',
            'numero_po' => 'required',
            'id_fiscale' => 'required',
            'direction' => 'required',
            'fournisseur' => 'required',
            'delai_paiement' => 'required',
            'structure_ordinatrice' => 'required',
            'numero_facture' => 'required',
            'date_reception' => 'required|date',
            'upload_document' => 'nullable|file',
            'nature_3wm' => 'required',
        ]);

        // Trouver la facture à mettre à jour
        $steg = Steg::findOrFail($id);

        // Mettre à jour les attributs de la facture
        $steg->montant = $request->input('montant');
        $steg->devise = $request->input('devise');
        $steg->date_facture = $request->input('date_facture');
        $steg->objet = $request->input('objet');
        $steg->numero_po = $request->input('numero_po');
        $steg->id_fiscale = $request->input('id_fiscale');
        $steg->direction = $request->input('direction');
        $steg->fournisseur = $request->input('fournisseur');
        $steg->delai_paiement = $request->input('delai_paiement');
        $steg->structure_ordinatrice = $request->input('structure_ordinatrice');
        $steg->numero_facture = $request->input('numero_facture');
        $steg->date_reception = $request->input('date_reception');
        $steg->nature_3wm = $request->input('nature_3wm');

        // Gérer le téléchargement des fichiers s'il y a un nouveau document
        if ($request->hasFile('upload_document')) {
            $uploadDocumentPath = $request->file('upload_document')->store('upload_documents');
            $steg->upload_document = $uploadDocumentPath;
        }

        // Sauvegarder les modifications apportées à la facture
        $steg->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Facture mise à jour avec succès!',
        ]);
    }

    /**
     * Supprime la facture spécifiée du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver la facture à supprimer
        $steg = Steg::findOrFail($id);

        // Supprimer la facture de la base de données
        $steg->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Facture supprimée avec succès!',
        ]);
    }
    public function countCurrentStegs()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = Steg::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de Stegs pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
