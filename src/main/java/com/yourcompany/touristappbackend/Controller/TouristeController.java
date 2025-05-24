// src/main/java/com/yourcompany/touristappbackend/controller/TouristeController.java
package com.yourcompany.touristappbackend.Controller;

import com.yourcompany.touristappbackend.model.Touriste;
import com.yourcompany.touristappbackend.model.Evaluation;
import com.yourcompany.touristappbackend.model.Paiement;
import com.yourcompany.touristappbackend.model.MethodePaiement; // Assurez-vous d'avoir cet Enum
import com.yourcompany.touristappbackend.Service.TouristeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.Map; // Pour les corps de requête génériques

@RestController
@RequestMapping("/api/touristes")
public class TouristeController {

    private final TouristeService touristeService;

    public TouristeController(TouristeService touristeService) {
        this.touristeService = touristeService;
    }

    @GetMapping
    public ResponseEntity<List<Touriste>> getAllTouristes() {
        List<Touriste> touristes = touristeService.getAllTouristes();
        return new ResponseEntity<>(touristes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Touriste> getTouristeById(@PathVariable UUID id) {
        Touriste touriste = touristeService.getTouristeById(id);
        return new ResponseEntity<>(touriste, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Touriste> createTouriste(@Valid @RequestBody Touriste touriste) {
        Touriste createdTouriste = touristeService.createTouriste(touriste);
        return new ResponseEntity<>(createdTouriste, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Touriste> updateTouriste(@PathVariable UUID id, @Valid @RequestBody Touriste touristeDetails) {
        Touriste updatedTouriste = touristeService.updateTouriste(id, touristeDetails);
        return new ResponseEntity<>(updatedTouriste, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTouriste(@PathVariable UUID id) {
        touristeService.deleteTouriste(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // --- Endpoints pour les actions métier du touriste ---

    @PatchMapping("/{touristeId}/demandes/{demandeId}/annuler")
    public ResponseEntity<Boolean> annulerDemande(
            @PathVariable UUID touristeId,
            @PathVariable UUID demandeId) {
        boolean success = touristeService.annulerDemande(touristeId, demandeId);
        return new ResponseEntity<>(success, HttpStatus.OK);
    }

    // Pour effectuer un paiement, vous pouvez créer un DTO (Data Transfer Object)
    // ou utiliser un Map simple pour les données du corps de la requête.
    @PostMapping("/{touristeId}/paiements")
    public ResponseEntity<Paiement> effectuerPaiement(
            @PathVariable UUID touristeId,
            @RequestBody Map<String, Object> paiementDetails) { // Utilisez un DTO pour plus de robustesse
        UUID demandeId = UUID.fromString((String) paiementDetails.get("demandeId"));
        Double montant = (Double) paiementDetails.get("montant");
        MethodePaiement methode = MethodePaiement.valueOf((String) paiementDetails.get("methodePaiement"));

        Paiement paiement = touristeService.effectuerPaiement(touristeId, demandeId, montant, methode);
        return new ResponseEntity<>(paiement, HttpStatus.CREATED);
    }

    // Pour évaluer un guide, également utiliser un DTO ou un Map
    @PostMapping("/{touristeId}/evaluations")
    public ResponseEntity<Evaluation> evaluerGuide(
            @PathVariable UUID touristeId,
            @RequestBody Map<String, Object> evaluationDetails) { // Utilisez un DTO
        UUID guideId = UUID.fromString((String) evaluationDetails.get("guideId"));
        int note = (Integer) evaluationDetails.get("note");
        String commentaire = (String) evaluationDetails.get("commentaire");

        Evaluation evaluation = touristeService.evaluerGuide(touristeId, guideId, note, commentaire);
        return new ResponseEntity<>(evaluation, HttpStatus.CREATED);
    }

    @PatchMapping("/{touristeId}/demandes/{demandeId}/confirmer-visite")
    public ResponseEntity<Boolean> confirmerVisite(
            @PathVariable UUID touristeId,
            @PathVariable UUID demandeId) {
        boolean success = touristeService.confirmerVisite(touristeId, demandeId);
        return new ResponseEntity<>(success, HttpStatus.OK);
    }
}