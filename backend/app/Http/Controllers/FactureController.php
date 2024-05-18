<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class FactureController extends Controller
{

    public function getCurrentDateFactures(Request $request)
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_profil = $request->query('user_profil');

        // Récupérer les Factures pour la date actuelle
        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $Factures = Facture::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $Factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $Factures = Facture::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $Factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $Factures = Facture::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $Factures]);
        } else {if ($user_profil === 'agent BOF') {
        $Factures = Facture::whereDate('created_at', $dateActuelle)->get();

        // Retourner les Factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $Factures]);
    }}}}}

    public function getPastDateFactures()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');

        // Récupérer les Factures antérieurs à la date actuelle
       $Factures = Facture::whereDate('created_at', '<', $dateActuelle)->get();

        // Retourner les Factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $Factures]);
    }
    // Méthode pour créer une nouvelle facture
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
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
            'user_id' => $user_id,
        ]);

        // Retourner une réponse JSON
        return response()->json(['success' => true, 'facture' => $facture], 201);
    }
    public function index(Request $request)
    {
        $user_id = $request->query('user_id');
        $user = User::find($user_id);
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }
        $factures = Facture::where('user_id', $user->id)->get();
    
        return response()->json(['user_id' => $user_id, 'factures' => $factures]);
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
        $facture->user_id = Auth::id(); // Assigner l'ID de l'utilisateur connecté

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
    public function updateStatus(Request $request, $id)
    {
        $facture = Facture::findOrFail($id);
        $facture->status = $request->input('status');
        $facture->save();

        return response()->json(['message' => 'Statut de la facture mis à jour avec succès'], 200);
    }
    public function countValidetres(Request $request)
    {
        $user_id = $request->query('user_id');
        // Compter les factures où validation_finale est "oui" et user_id est présent
        $count2 = Facture::where('valide_tres', 'oui')
        ->where('user_id', $user_id)
        ->count();
        $factures = Facture::select('montant', 'num_fact', 'date_fact')
        ->where('valide_tres', 'oui')
        ->where('user_id', $user_id)
        ->get();
        // Retourner le nombre de factures en tant que réponse JSON
        return response()->json(['success' => true, 'count' => $count2, 'factures' => $factures]);
    }
    public function countvalidefisc(Request $request)
    {
        $user_id = $request->query('user_id');
        $count1 = Facture::where('valide_fisc', 'oui')
            ->where('user_id', $user_id)
            ->where(function ($query) {
                $query->whereNull('valide_tres')
                      ->orWhere('valide_tres', 'non');
            })
            ->count();
            $factures = Facture::select('montant', 'num_fact', 'date_fact')
            ->where('valide_fisc', 'oui')
            ->where('user_id', $user_id)
            ->where(function ($query) {
                $query->whereNull('valide_tres')
                      ->orWhere('valide_tres', 'non');
            })
            ->get();
        
        // Retourner le nombre de factures en tant que réponse JSON
        return response()->json(['success' => true, 'count' => $count1, 'factures' => $factures]);
    }
    public function countValidecompt(Request $request)
    {
        $user_id = $request->query('user_id');
        $count3 = Facture::where('valide_compt', 'oui')
            ->where('user_id', $user_id)
            ->where(function ($query) {
                $query->whereNull('valide_tres')
                      ->orWhere('valide_tres', 'non');
            })
            ->where(function ($query) {
                $query->whereNull('valide_fisc')
                      ->orWhere('valide_fisc', 'non');
            })
            ->count();
            $factures = Facture::select('montant', 'num_fact', 'date_fact')
            ->where('valide_compt', 'oui')
            ->where('user_id', $user_id)
            ->where(function ($query) {
                $query->whereNull('valide_tres')
                      ->orWhere('valide_tres', 'non');
            })
            ->where(function ($query) {
                $query->whereNull('valide_fisc')
                      ->orWhere('valide_fisc', 'non');
            })
            ->get();
        // Retourner le nombre de factures en tant que réponse JSON
        return response()->json(['success' => true, 'count' => $count3, 'factures' => $factures]);
    }
    public function countValidebof(Request $request)
    {
        $user_id = $request->query('user_id');
        $count4 = Facture::where('validation', 'oui')
            ->where('user_id', $user_id)
            ->where(function ($query) {
                $query->whereNull('valide_compt')
                      ->orWhere('valide_compt', 'non');
            })
            ->where(function ($query) {
                $query->whereNull('valide_tres')
                      ->orWhere('valide_tres', 'non');
            })
            ->where(function ($query) {
                $query->whereNull('valide_fisc')
                      ->orWhere('valide_fisc', 'non');
            })
            ->count();

            $factures = Facture::select('montant', 'num_fact', 'date_fact')
            ->where('validation', 'oui')
            ->where('user_id', $user_id)
            ->where(function ($query) {
                $query->whereNull('valide_compt')
                      ->orWhere('valide_compt', 'non');
            })
            ->where(function ($query) {
                $query->whereNull('valide_tres')
                      ->orWhere('valide_tres', 'non');
            })
            ->where(function ($query) {
                $query->whereNull('valide_fisc')
                      ->orWhere('valide_fisc', 'non');
            })
            ->get();
        // Retourner le nombre de factures en tant que réponse JSON
    return response()->json(['success' => true, 'count' => $count4, 'factures' => $factures]);
    }
    public function countFacturesRejetees(Request $request)
    {
        $user_id = $request->query('user_id');
    
        // Compter les factures rejetées où user_id est présent et motif différent de 'aucune'
        $count = Facture::where('user_id', $user_id)
                        ->where('motifs', '!=', 'aucune')
                        ->count();
        $factures = Facture::select('montant', 'num_fact', 'date_fact','motifs')
        ->where('motifs', '!=', 'aucune')
        ->where('user_id', $user_id)
                        ->get();
        // Retourner le nombre de factures rejetées en tant que réponse JSON
        return response()->json(['success' => true, 'count' => $count, 'factures' => $factures]);
    }
    public function countCurrentFactures()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = Facture::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de factures pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }

    public function countFacturesByDay(Request $request)
    {
        $user_id = $request->query('user_id');
        $facturesByDay = [];
    
        // Obtenez les noms des jours de la semaine dans la langue de l'utilisateur
        $labels = [];
        $firstDayOfWeek = Carbon::now()->startOfWeek()->isoFormat('dddd');
        $weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $startIndex = array_search($firstDayOfWeek, $weekDays); // Trouver l'index du premier jour de la semaine actuelle
        for ($i = $startIndex; $i < count($weekDays); $i++) {
            $labels[] = $weekDays[$i];
        }
        for ($i = 0; $i < $startIndex; $i++) {
            $labels[] = $weekDays[$i];
        }
    
        $data = array_fill(0, 7, 0); // Initialiser le tableau avec 7 zéros pour chaque jour de la semaine
    
        // Récupérer les données pour les 7 derniers jours
        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::now()->startOfWeek()->addDays($i)->toDateString();
            $count = Facture::where('user_id', $user_id)
                ->whereDate('created_at', $date)
                ->count();
            $dayOfWeek = Carbon::now()->startOfWeek()->addDays($i)->format('N') - 1; // Obtenir le jour de la semaine (1 pour lundi, 7 pour dimanche)
            $data[$dayOfWeek] = $count; // Stocker le nombre de factures pour ce jour de la semaine
        }
    
        // Réorganiser les données pour correspondre à l'ordre des jours de la semaine
        $data = array_merge(array_slice($data, $startIndex), array_slice($data, 0, $startIndex));
    
        // Retourner les données sous forme de réponse JSON
        return response()->json([
            'labels' => $labels,
            'datasets' => [
                [
                    'data' => $data,
                ]
            ]
        ]);
    }
    
    
    
    
        
}

