package com.yourcompany.touristappbackend.Controller;

import com.yourcompany.touristappbackend.Service.EvaluationService;
import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.Evaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid; // Pour la validation des requêtes

import java.util.List;

/**
 * Contrôleur REST pour la gestion des évaluations des guides par les touristes.
 * Expose des endpoints pour les opérations CRUD et les recherches spécifiques.
 */
@RestController
@RequestMapping("/api/evaluations") // Point d'accès de base pour toutes les requêtes d'évaluation
@CrossOrigin(origins = "*") // Permettre les requêtes CORS depuis n'importe quelle origine (à ajuster en production)
public class EvaluationController {

    private final EvaluationService evaluationService;

    /**
     * Constructeur avec injection de dépendances pour le service d'évaluation.
     * @param evaluationService Le service gérant la logique métier des évaluations.
     */
    @Autowired
    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    /**
     * Récupère toutes les évaluations enregistrées dans le système.
     * @return Une ResponseEntity contenant une liste de tous les objets Evaluation.
     */
    @GetMapping
    public ResponseEntity<List<Evaluation>> getAllEvaluations() {
        List<Evaluation> evaluations = evaluationService.getAllEvaluations();
        return ResponseEntity.ok(evaluations);
    }

    /**
     * Récupère une évaluation spécifique par son identifiant unique.
     * @param id L'ID de l'évaluation à récupérer.
     * @return Une ResponseEntity contenant l'objet Evaluation correspondant ou une erreur 404 si non trouvé.
     * @throws ResourceNotFoundException si aucune évaluation n'est trouvée avec l'ID donné.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Evaluation> getEvaluationById(@PathVariable Long id) {
        Evaluation evaluation = evaluationService.getEvaluationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evaluation non trouvée avec l'ID : " + id));
        return ResponseEntity.ok(evaluation);
    }

    /**
     * Crée une nouvelle évaluation.
     * Le corps de la requête doit inclure les détails de l'évaluation, y compris l'ID du guide et du touriste.
     * @param evaluation L'objet Evaluation à créer.
     * @return Une ResponseEntity contenant l'évaluation créée avec un statut 201 Created.
     * @throws ResourceNotFoundException si le guide ou le touriste associé n'existe pas.
     * @throws IllegalArgumentException si les données de l'évaluation sont invalides.
     */
    @PostMapping
    public ResponseEntity<Evaluation> createEvaluation(@Valid @RequestBody Evaluation evaluation) {
        Evaluation createdEvaluation = evaluationService.createEvaluation(evaluation);
        return new ResponseEntity<>(createdEvaluation, HttpStatus.CREATED);
    }

    /**
     * Met à jour une évaluation existante.
     * Permet de modifier la note et le commentaire d'une évaluation.
     * @param id L'ID de l'évaluation à mettre à jour.
     * @param evaluationDetails L'objet Evaluation contenant les informations mises à jour.
     * @return Une ResponseEntity contenant l'évaluation mise à jour.
     * @throws ResourceNotFoundException si aucune évaluation n'est trouvée avec l'ID donné.
     * @throws IllegalArgumentException si la modification du guide ou du touriste associé est tentée.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Evaluation> updateEvaluation(@PathVariable Long id, @Valid @RequestBody Evaluation evaluationDetails) {
        Evaluation updatedEvaluation = evaluationService.updateEvaluation(id, evaluationDetails);
        return ResponseEntity.ok(updatedEvaluation);
    }

    /**
     * Supprime une évaluation par son identifiant unique.
     * @param id L'ID de l'évaluation à supprimer.
     * @return Une ResponseEntity vide avec un statut 204 No Content.
     * @throws ResourceNotFoundException si aucune évaluation n'est trouvée avec l'ID donné.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        evaluationService.deleteEvaluation(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Récupère toutes les évaluations pour un guide spécifique.
     * @param guideId L'ID du guide pour lequel récupérer les évaluations.
     * @return Une ResponseEntity contenant une liste d'évaluations pour le guide donné.
     */
    @GetMapping("/guide/{guideId}")
    public ResponseEntity<List<Evaluation>> getEvaluationsByGuideId(@PathVariable Long guideId) {
        List<Evaluation> evaluations = evaluationService.getEvaluationsByGuideId(guideId);
        return ResponseEntity.ok(evaluations);
    }

    /**
     * Récupère toutes les évaluations faites par un touriste spécifique.
     * @param touristeId L'ID du touriste pour lequel récupérer les évaluations.
     * @return Une ResponseEntity contenant une liste d'évaluations faites par le touriste donné.
     */
    @GetMapping("/touriste/{touristeId}")
    public ResponseEntity<List<Evaluation>> getEvaluationsByTouristeId(@PathVariable Long touristeId) {
        List<Evaluation> evaluations = evaluationService.getEvaluationsByTouristeId(touristeId);
        return ResponseEntity.ok(evaluations);
    }
}