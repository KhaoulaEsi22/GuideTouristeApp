package com.yourcompany.touristappbackend.Controller;


import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.StatutDemande;
import com.yourcompany.touristappbackend.model.Touriste;
import com.yourcompany.touristappbackend.Repository.DemandeRepository;
import com.yourcompany.touristappbackend.Repository.GuideRepository; // Supposons que vous ayez un GuideRepository
import com.yourcompany.touristappbackend.Repository.TouristeRepository; // Supposons que vous ayez un TouristeRepository
import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/demandes") // Point d'accès de base pour toutes les requêtes de demande
public class DemandeController {

    private final DemandeRepository demandeRepository;
    private final TouristeRepository touristeRepository; // Nécessaire pour associer une demande à un touriste
    private final GuideRepository guideRepository; // Nécessaire pour associer une demande à un guide ou pour les actions du guide

    // Injection des dépendances via le constructeur
    @Autowired
    public DemandeController(DemandeRepository demandeRepository,
                             TouristeRepository touristeRepository,
                             GuideRepository guideRepository) {
        this.demandeRepository = demandeRepository;
        this.touristeRepository = touristeRepository;
        this.guideRepository = guideRepository;
    }

    /**
     * Récupère toutes les demandes.
     * @return Une liste de toutes les demandes.
     */
    @GetMapping
    public ResponseEntity<List<Demande>> getAllDemandes() {
        List<Demande> demandes = demandeRepository.findAll();
        return ResponseEntity.ok(demandes);
    }

    /**
     * Récupère une demande par son ID.
     * @param id L'ID de la demande.
     * @return La demande correspondante ou une erreur 404 si non trouvée.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Demande> getDemandeById(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));
        return ResponseEntity.ok(demande);
    }

    /**
     * Crée une nouvelle demande.
     * Le corps de la requête doit inclure l'ID du touriste.
     * @param demande La demande à créer.
     * @param touristeId L'ID du touriste qui fait la demande.
     * @return La demande créée avec un statut 201 Created.
     */
    @PostMapping
    public ResponseEntity<Demande> createDemande(@RequestBody Demande demande, @RequestParam Long touristeId) {
        // Vérifier si le touriste existe
        Touriste touriste = touristeRepository.findById(touristeId)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste non trouvé avec l'ID : " + touristeId));

        demande.setTouriste(touriste);
        demande.setDateDemande(LocalDateTime.now()); // Définir la date de la demande
        demande.setStatut(StatutDemande.EN_ATTENTE); // Nouvelle demande est toujours en attente

        Demande savedDemande = demandeRepository.save(demande);
        return new ResponseEntity<>(savedDemande, HttpStatus.CREATED);
    }

    /**
     * Met à jour une demande existante.
     * @param id L'ID de la demande à mettre à jour.
     * @param demandeDetails Les détails de la demande mis à jour.
     * @return La demande mise à jour.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Demande> updateDemande(@PathVariable Long id, @RequestBody Demande demandeDetails) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        // Mettre à jour les champs modifiables
        demande.setDescription(demandeDetails.getDescription());
        // Vous pouvez ajouter d'autres champs à mettre à jour ici, mais le statut et la date ne devraient pas être mis à jour directement via cette méthode générique.
        // Les changements de statut devraient se faire via des endpoints spécifiques (accepter/refuser).

        Demande updatedDemande = demandeRepository.save(demande);
        return ResponseEntity.ok(updatedDemande);
    }

    /**
     * Supprime une demande par son ID.
     * @param id L'ID de la demande à supprimer.
     * @return Une réponse vide avec un statut 204 No Content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemande(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        demandeRepository.delete(demande);
        return ResponseEntity.noContent().build();
    }

    /**
     * Récupère toutes les demandes faites par un touriste spécifique.
     * @param touristeId L'ID du touriste.
     * @return Une liste de demandes.
     */
    @GetMapping("/touriste/{touristeId}")
    public ResponseEntity<List<Demande>> getDemandesByTouristeId(@PathVariable Long touristeId) {
        List<Demande> demandes = demandeRepository.findByTouristeId(touristeId);
        return ResponseEntity.ok(demandes);
    }

    /**
     * Récupère toutes les demandes adressées à un guide spécifique.
     * @param guideId L'ID du guide.
     * @return Une liste de demandes.
     */
    @GetMapping("/guide/{guideId}")
    public ResponseEntity<List<Demande>> getDemandesByGuideId(@PathVariable Long guideId) {
        List<Demande> demandes = demandeRepository.findByGuideId(guideId);
        return ResponseEntity.ok(demandes);
    }

    /**
     * Récupère toutes les demandes avec un statut spécifique.
     * @param statut Le statut de la demande (ex: EN_ATTENTE, ACCEPTEE, REFUSEE).
     * @return Une liste de demandes.
     */
    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Demande>> getDemandesByStatut(@PathVariable StatutDemande statut) {
        List<Demande> demandes = demandeRepository.findByStatut(statut);
        return ResponseEntity.ok(demandes);
    }

    /**
     * Permet à un guide d'accepter une demande.
     * @param id L'ID de la demande à accepter.
     * @param guideId L'ID du guide qui accepte la demande.
     * @return La demande mise à jour avec le statut ACCEPTEE.
     */
    @PutMapping("/{id}/accepter")
    public ResponseEntity<Demande> accepterDemande(@PathVariable Long id, @RequestParam Long guideId) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide non trouvé avec l'ID : " + guideId));

        // Vérifiez que la demande est en attente et qu'elle n'est pas déjà attribuée
        if (demande.getStatut() == StatutDemande.EN_ATTENTE) {
            demande.setStatut(StatutDemande.ACCEPTEE);
            demande.setGuide(guide); // Associer le guide à la demande
            Demande updatedDemande = demandeRepository.save(demande);
            return ResponseEntity.ok(updatedDemande);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Ou une autre erreur si la demande n'est pas en attente
        }
    }

    /**
     * Permet à un guide de refuser une demande.
     * @param id L'ID de la demande à refuser.
     * @return La demande mise à jour avec le statut REFUSEE.
     */
    @PutMapping("/{id}/refuser")
    public ResponseEntity<Demande> refuserDemande(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        // Vérifiez que la demande est en attente
        if (demande.getStatut() == StatutDemande.EN_ATTENTE) {
            demande.setStatut(StatutDemande.REFUSEE);
            // Vous pourriez vouloir dissocier le guide si un guide était déjà assigné temporairement
            demande.setGuide(null);
            Demande updatedDemande = demandeRepository.save(demande);
            return ResponseEntity.ok(updatedDemande);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Ou une autre erreur si la demande n'est pas en attente
        }
    }

    /**
     * Permet à un touriste d'annuler sa demande.
     * @param id L'ID de la demande à annuler.
     * @return La demande mise à jour avec le statut ANNULEE.
     */
    @PutMapping("/{id}/annuler")
    public ResponseEntity<Demande> annulerDemande(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        // Un touriste peut annuler une demande si elle est en attente ou acceptée (avant le service)
        if (demande.getStatut() == StatutDemande.EN_ATTENTE || demande.getStatut() == StatutDemande.ACCEPTEE) {
            demande.setStatut(StatutDemande.ANNULEE);
            Demande updatedDemande = demandeRepository.save(demande);
            return ResponseEntity.ok(updatedDemande);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Impossible d'annuler une demande déjà terminée ou refusée
        }
    }

    /**
     * Permet de marquer une demande comme terminée (après que le service a été rendu).
     * Ceci pourrait être déclenché par le guide ou l'administrateur.
     * @param id L'ID de la demande à terminer.
     * @return La demande mise à jour avec le statut TERMINEE.
     */
    @PutMapping("/{id}/terminer")
    public ResponseEntity<Demande> terminerDemande(@PathVariable Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        // Une demande ne peut être terminée que si elle a été acceptée
        if (demande.getStatut() == StatutDemande.ACCEPTEE) {
            demande.setStatut(StatutDemande.TERMINEE);
            Demande updatedDemande = demandeRepository.save(demande);
            return ResponseEntity.ok(updatedDemande);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // La demande n'est pas dans un état où elle peut être terminée
        }
    }
}


