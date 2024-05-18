<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommissionDistribution;
use Carbon\Carbon;

class CommissionDistributionController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');

        // Récupérer les commissions de distribution pour la date actuelle
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $commissions = CommissionDistribution::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $commissions]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $commissions = CommissionDistribution::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $commissions]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $commissions = CommissionDistribution::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $commissions]);
        } else {if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $commissions = CommissionDistribution::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $commissions]);
        } else{$commissions = CommissionDistribution::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();

        // Retourner les commissions de distribution en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $commissions]);
    }}}}}

    public function getPastDateFactures()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');

        // Récupérer les commissions de distribution antérieures à la date actuelle
        $commissions = CommissionDistribution::whereDate('created_at', '<', $dateActuelle)->get();

        // Retourner les commissions de distribution en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $commissions]);
    }
    public function show($id){
        $CommissionDistribution = CommissionDistribution::findOrFail($id);
        return response()->json($CommissionDistribution);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'commission' => 'required|string',
            'fournisseur' => 'required|string',
            'id_fiscale' => 'required|string',
            'date_facture' => 'required|date',
            'date_rec' => 'required|date',
            'objet' => 'required|string',
            'pieces_jointes' => 'required|string',
            'montant' => 'required|numeric',
            'devise' => 'required|string',
            'num_facture' => 'required|string',
            'delai_paiement' => 'required|string',
            'upload_document' => 'required|file|mimes:pdf,png,jpg',
        ]);

        // Gérez le fichier téléchargé
        $file = $request->file('upload_document');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        // Créez une nouvelle instance de CommissionDistribution
        $commissionDistribution = new CommissionDistribution;
        $commissionDistribution->commission = $request->commission;
        $commissionDistribution->fournisseur = $request->fournisseur;
        $commissionDistribution->id_fiscale = $request->id_fiscale;
        $commissionDistribution->date_facture = $request->date_facture;
        $commissionDistribution->date_rec = $request->date_rec;
        $commissionDistribution->objet = $request->objet;
        $commissionDistribution->pieces_jointes = $request->pieces_jointes;
        $commissionDistribution->montant = $request->montant;
        $commissionDistribution->devise = $request->devise;
        $commissionDistribution->num_facture = $request->num_facture;
        $commissionDistribution->delai_paiement = $request->delai_paiement;
        $commissionDistribution->upload_document = $filePath;
        $commissionDistribution->user_id = $request->user_id;
        $commissionDistribution->save();

        return response()->json(['success' => true, 'message' => 'Facture créée avec succès!']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'commission' => 'required|string',
            'fournisseur' => 'required|string',
            'id_fiscale' => 'required|string',
            'date_facture' => 'required|date',
            'date_rec' => 'required|date',
            'objet' => 'required|string',
            'pieces_jointes' => 'required|string',
            'montant' => 'required|numeric',
            'devise' => 'required|string',
            'num_facture' => 'required|string',
            'delai_paiement' => 'required|string',
            'upload_document' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Trouver la commission de distribution à mettre à jour
        $commission = CommissionDistribution::findOrFail($id);

        // Mettre à jour les attributs de la commission de distribution
        $commission->commission = $request->input('commission');
        $commission->fournisseur = $request->input('fournisseur');
        $commission->id_fiscale = $request->input('id_fiscale');
        $commission->date_facture = $request->input('date_facture');
        $commission->date_rec = $request->input('date_rec');
        $commission->objet = $request->input('objet');
        $commission->pieces_jointes = $request->input('pieces_jointes');
        $commission->montant = $request->input('montant');
        $commission->devise = $request->input('devise');
        $commission->num_facture = $request->input('num_facture');
        $commission->delai_paiement = $request->input('delai_paiement');

        // Gérer le téléchargement des fichiers si un nouveau fichier est fourni
        if ($request->hasFile('upload_document')) {
            $filePath = $request->file('upload_document')->store('uploads');
            $commission->upload_document = $filePath;
        }

        // Sauvegarder les modifications apportées à la commission de distribution
        $commission->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Commission de distribution mise à jour avec succès!',
        ]);
    }

    /**
     * Supprime la commission de distribution spécifiée du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver la commission de distribution à supprimer
        $commission = CommissionDistribution::findOrFail($id);

        // Supprimer la commission de distribution de la base de données
        $commission->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Commission de distribution supprimée avec succès!',
        ]);
    }
    public function countCurrentCommissionDistributions()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = CommissionDistribution::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de CommissionDistributions pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
