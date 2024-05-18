<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{


    
        /**
         * Affiche les données de l'utilisateur connecté.
         *
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\Response
         */
   // Méthode pour récupérer une facture spécifique par son ID
   public function index()
   {
       $users = User::all();
       return response()->json($users);
   }
   
   public function show($id)
   {
       $user = User::findOrFail($id);
       return response()->json($user);
   }

   public function update(Request $request, $id)
   {
       $user = User::findOrFail($id);
       
       // Valider les données de la requête
       $request->validate([
           'name' => 'string|max:255',
           'lastname' => 'string|max:255',
           'email' => 'string|email|max:255|unique:users,email,'.$user->id, // Vérifiez l'unicité de l'email, mais excluez l'email de l'utilisateur en cours
           'phone' => 'string',
           'nationnalite' => 'string|max:255',
           'adresse' => 'string|max:255',
           'password' => 'nullable|string|min:8|regex:/^(?=.*[a-zA-Z])(?=.*\d).{8}$/', // Mot de passe facultatif avec validation conditionnelle
       ]);
   
       // Mettre à jour les champs de l'utilisateur avec les nouvelles données
       $user->name = $request->input('name');
       $user->lastname = $request->input('lastname');
       $user->email = $request->input('email');
       $user->phone = $request->input('phone');
       $user->nationnalite = $request->input('nationnalite');
       $user->adresse = $request->input('adresse');
       
       // Mettre à jour le mot de passe si un nouveau mot de passe est fourni
       if ($request->has('password')) {
           $user->password = Hash::make($request->input('password')); // Store hashed password
       }
   
       $user->save();
   
       return response()->json(['success' => true, 'message' => 'Informations modifiées avec succès!']);
   }
   
   public function countActiveUsers()
   {
       // Utilisez la méthode `where` pour filtrer les utilisateurs où isActive = 1, puis utilisez la méthode `count` pour obtenir le nombre total
       $count = User::where('isactive', 1)->count();
       
       // Retournez le nombre d'utilisateurs actifs sous forme de réponse JSON
       return response()->json(['count' => $count]);
   }
}
