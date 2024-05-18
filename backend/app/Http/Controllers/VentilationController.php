<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ventilation;
use Carbon\Carbon;

class VentilationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Ventilation::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Ventilation::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Ventilation::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = Ventilation::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{ $factures = Ventilation::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();

        return response()->json(['success' => true, 'data' => $factures]);
       
    }}}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $factures = Ventilation::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id)
    {
        $Ventilation = Ventilation::findOrFail($id);
        return response()->json($Ventilation);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');

        $request->validate([
            'beneficiaire' => 'required|string',
            'date_ordre_paiement' => 'required|date',
            'direction' => 'required|string',
            'date_reception' => 'required|date',
            'objet' => 'required|string',
            'ventilation_direct' => 'required|string',
            'ordre_paiement' => 'required|string',
            'structure_ordinatrice' => 'required|string',
            'devise' => 'required|string',
            'montant' => 'required|numeric',
            'upload_document' => 'required|file|mimes:pdf,png,jpg',
            'pieces_jointes' => 'required|string',
        ]);

        // Gérez le fichier téléchargé
        $file = $request->file('upload_document');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        // Créez une nouvelle instance de Ventilation
        $ventilation = new Ventilation;
        $ventilation->beneficiaire = $request->beneficiaire;
        $ventilation->pieces_jointes = $request->pieces_jointes;
        $ventilation->date_ordre_paiement = $request->date_ordre_paiement;
        $ventilation->direction = $request->direction;
        $ventilation->date_reception = $request->date_reception;
        $ventilation->objet = $request->objet;
        $ventilation->ventilation_direct = $request->ventilation_direct;
        $ventilation->ordre_paiement = $request->ordre_paiement;
        $ventilation->structure_ordinatrice = $request->structure_ordinatrice;
        $ventilation->devise = $request->devise;
        $ventilation->montant = $request->montant;
        $ventilation->upload_document = $filePath;
        $ventilation->user_id = $request->user_id;
        $ventilation->save();

        return response()->json(['success' => true, 'message' => 'Facture créée avec succès!']);
    }
    public function update(Request $request, $id)
{
    $ventilation = Ventilation::findOrFail($id);

    // Validez les données de la requête
    $request->validate([
        'beneficiaire' => 'required|string',
        'date_ordre_paiement' => 'required|date',
        'direction' => 'required|string',
        'date_reception' => 'required|date',
        'objet' => 'required|string',
        'ventilation_direct' => 'required|string',
        'ordre_paiement' => 'required|string',
        'structure_ordinatrice' => 'required|string',
        'devise' => 'required|string',
        'montant' => 'required|numeric',
        'pieces_jointes' => 'required|string',
        // Ajoutez ici les autres règles de validation pour la mise à jour
    ]);

    // Gérez le fichier téléchargé s'il est présent dans la requête
    if ($request->hasFile('upload_document')) {
        $request->validate([
            'upload_document' => 'file|mimes:pdf,png,jpg',
        ]);

        // Gérez le fichier téléchargé
        $file = $request->file('upload_document');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        // Mettez à jour le chemin du fichier dans la ventilation
        $ventilation->upload_document = $filePath;
    }

    // Mettez à jour les autres propriétés de la ventilation
    $ventilation->update($request->all());

    return response()->json(['success' => true, 'message' => 'Facture mise à jour avec succès!']);
}

/**
 * Remove the specified resource from storage.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
public function destroy($id)
{
    $ventilation = Ventilation::findOrFail($id);
    $ventilation->delete();

    return response()->json(['success' => true, 'message' => 'Facture supprimée avec succès!']);
}
public function countCurrentVentilations()
{
    // Récupérer la date actuelle
    $dateActuelle = Carbon::now()->format('Y-m-d');
    
    // Compter les factures pour la date actuelle
    $count = Ventilation::whereDate('created_at', $dateActuelle)->count();
    
    // Retourner le nombre de Ventilations pour la date actuelle sous forme de réponse JSON
    return response()->json(['count' => $count]);
}

}