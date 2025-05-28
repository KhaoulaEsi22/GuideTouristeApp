package com.yourcompany.touristappbackend.Controller;

import com.yourcompany.touristappbackend.model.Paiement;
import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.StatutDemande;
import com.yourcompany.touristappbackend.model.MethodePaiement; // Importe la nouvelle enum MethodePaiement
import com.yourcompany.touristappbackend.Service.PaiementService; // Importe le service
import com.yourcompany.touristappbackend.Repository.DemandeRepository; // Nécessaire pour associer un paiement à une demande lors de la création
import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid; // Pour la validation des requêtes

import java.util.List;
import java.util.Map;
import java.util.Date; // Pour la date de paiement

/**
 * Contrôleur REST pour la gestion des paiements dans l'application touristique.
 * Ce contrôleur expose des endpoints pour les opérations CRUD et la gestion des statuts de paiement.
 */
@RestController
@RequestMapping("/api/paiements") // Point d'accès de base pour toutes les requêtes de paiement
@CrossOrigin(origins = "*") // Permettre les requêtes CORS depuis n'importe quelle origine (à ajuster en production)
public class PaiementController {

    private final PaiementService paiementService;
    private final DemandeRepository demandeRepository; // Utilisé pour récupérer l'entité Demande lors de la création d'un paiement

    /**
     * Constructeur avec injection de dépendances pour le service de paiement et le repository de demande.
     * @param paiementService Le service gérant la logique métier des paiements.
     * @param demandeRepository Le repository pour accéder aux entités Demande.
     */
    @Autowired
    public PaiementController(PaiementService paiementService, DemandeRepository demandeRepository) {
        this.paiementService = paiementService;
        this.demandeRepository = demandeRepository;
    }

    /**
     * Récupère tous les paiements enregistrés dans le système.
     * @return Une ResponseEntity contenant une liste de tous les objets Paiement.
     */
    @GetMapping
    public ResponseEntity<List<Paiement>> getAllPaiements() {
        List<Paiement> paiements = paiementService.getAllPaiements();
        return ResponseEntity.ok(paiements);
    }

    /**
     * Récupère un paiement spécifique par son identifiant unique.
     * @param id L'ID du paiement à récupérer.
     * @return Une ResponseEntity contenant l'objet Paiement correspondant ou une erreur 404 si non trouvé.
     * @throws ResourceNotFoundException si aucun paiement n'est trouvé avec l'ID donné.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Paiement> getPaiementById(@PathVariable Long id) {
        Paiement paiement = paiementService.getPaiementById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé avec l'ID : " + id));
        return ResponseEntity.ok(paiement);
    }

    /**
     * Crée un nouveau paiement.
     * Ce endpoint est conçu pour la création directe d'un paiement, potentiellement par un système interne.
     * Le corps de la requête doit inclure le montant, la méthode de paiement et l'ID de la demande associée.
     * @param paiementDetails Un Map contenant les détails du paiement (montant, methodePaiement, demandeId).
     * @return Une ResponseEntity contenant le paiement créé avec un statut 201 Created.
     * @throws ResourceNotFoundException si la demande associée n'est pas trouvée.
     * @throws IllegalArgumentException si la méthode de paiement est invalide.
     */
    @PostMapping
    public ResponseEntity<Paiement> createPaiement(@RequestBody Map<String, Object> paiementDetails) {
        Long demandeId = Long.parseLong(paiementDetails.get("demandeId").toString());
        Double montant = Double.parseDouble(paiementDetails.get("montant").toString());
        MethodePaiement methode = MethodePaiement.valueOf(paiementDetails.get("methodePaiement").toString());

        // Vérifier si la demande associée existe avant de créer le paiement
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + demandeId));

        // Construire l'objet Paiement à partir des détails fournis
        Paiement paiement = Paiement.builder()
                .montant(montant)
                .methodePaiement(methode)
                .demande(demande)
                .datePaiement(new Date()) // La date de paiement est définie à la création
                .statut(StatutDemande.StatutPaiement.EN_ATTENTE) // Un nouveau paiement est toujours en attente
                .build();

        // Utiliser le service pour gérer la logique de création (ex: génération de transactionId, interaction passerelle)
        Paiement savedPaiement = paiementService.createPaiement(paiement);
        return new ResponseEntity<>(savedPaiement, HttpStatus.CREATED);
    }

    /**
     * Met à jour un paiement existant.
     * Ce endpoint permet de modifier les détails d'un paiement, y compris son statut.
     * @param id L'ID du paiement à mettre à jour.
     * @param paiementDetails L'objet Paiement contenant les informations mises à jour.
     * @return Une ResponseEntity contenant le paiement mis à jour.
     * @throws ResourceNotFoundException si aucun paiement n'est trouvé avec l'ID donné.
     * @throws IllegalArgumentException si la transition de statut est invalide ou si la demande associée est tentée de modifier.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Paiement> updatePaiement(@PathVariable Long id, @Valid @RequestBody Paiement paiementDetails) {
        Paiement updatedPaiement = paiementService.updatePaiement(id, paiementDetails);
        return ResponseEntity.ok(updatedPaiement);
    }

    /**
     * Supprime un paiement par son identifiant unique.
     * @param id L'ID du paiement à supprimer.
     * @return Une ResponseEntity vide avec un statut 204 No Content.
     * @throws ResourceNotFoundException si aucun paiement n'est trouvé avec l'ID donné.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaiement(@PathVariable Long id) {
        paiementService.deletePaiement(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Récupère tous les paiements associés à une demande spécifique par son ID.
     * @param demandeId L'ID de la demande pour laquelle récupérer les paiements.
     * @return Une ResponseEntity contenant une liste de paiements liés à la demande.
     */
    @GetMapping("/demande/{demandeId}")
    public ResponseEntity<List<Paiement>> getPaiementsByDemandeId(@PathVariable Long demandeId) {
        List<Paiement> paiements = paiementService.getPaiementsByDemandeId(demandeId);
        return ResponseEntity.ok(paiements);
    }

    /**
     * Traite un paiement, simulant l'interaction avec une passerelle de paiement.
     * Ce endpoint met à jour le statut du paiement à 'VALIDE' ou 'ECHOUE' en fonction du résultat du traitement.
     * @param id L'ID du paiement à traiter.
     * @return Une ResponseEntity contenant le paiement mis à jour.
     * @throws ResourceNotFoundException si le paiement n'est pas trouvé.
     * @throws IllegalArgumentException si le statut actuel du paiement ne permet pas le traitement.
     */
    @PatchMapping("/{id}/traiter")
    public ResponseEntity<Paiement> traiterPaiement(@PathVariable Long id) {
        Paiement processedPaiement = paiementService.traiterPaiement(id);
        return ResponseEntity.ok(processedPaiement);
    }

    /**
     * Annule un paiement ou initie un remboursement si le paiement est déjà valide.
     * Ce endpoint gère les transitions de statut vers 'REMBOURSE' ou 'ECHOUE' en cas d'annulation.
     * @param id L'ID du paiement à annuler.
     * @return Une ResponseEntity contenant le paiement mis à jour.
     * @throws ResourceNotFoundException si le paiement n'est pas trouvé.
     * @throws IllegalArgumentException si le statut actuel du paiement ne permet pas l'annulation.
     */
    @PatchMapping("/{id}/annuler")
    public ResponseEntity<Paiement> annulerPaiement(@PathVariable Long id) {
        Paiement cancelledPaiement = paiementService.annulerPaiement(id);
        return ResponseEntity.ok(cancelledPaiement);
    }

    /**
     * Récupère tous les paiements ayant un statut spécifique.
     * @param statut Le statut de paiement (EN_ATTENTE, VALIDE, ECHOUE, REMBOURSE).
     * @return Une liste de paiements correspondant au statut donné.
     */
    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Paiement>> getPaiementsByStatut(@PathVariable StatutDemande.StatutPaiement statut) {
        List<Paiement> paiements = paiementService.getPaiementsByStatut(statut);
        return ResponseEntity.ok(paiements);
    }

    /**
     * Récupère tous les paiements effectués avec une méthode de paiement spécifique.
     * @param methodePaiement La méthode de paiement (CARTE_CREDIT, PAYPAL, VIREMENT_BANCAIRE, CASH).
     * @return Une liste de paiements correspondant à la méthode de paiement donnée.
     */
    @GetMapping("/methode/{methodePaiement}")
    public ResponseEntity<List<Paiement>> getPaiementsByMethodePaiement(@PathVariable MethodePaiement methodePaiement) {
        List<Paiement> paiements = paiementService.getPaiementsByMethodePaiement(methodePaiement);
        return ResponseEntity.ok(paiements);
    }

    /**
     * Récupère un paiement par son ID de transaction unique.
     * @param transactionId L'ID de transaction du paiement.
     * @return Une ResponseEntity contenant le paiement trouvé ou une erreur 404 si non trouvé.
     * @throws ResourceNotFoundException si aucun paiement n'est trouvé avec l'ID de transaction donné.
     */
    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<Paiement> getPaiementByTransactionId(@PathVariable String transactionId) {
        Paiement paiement = paiementService.getPaiementByTransactionId(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé avec l'ID de transaction : " + transactionId));
        return ResponseEntity.ok(paiement);
    }
}
