package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.Evaluation;
import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.Touriste;
import com.yourcompany.touristappbackend.Repository.EvaluationRepository;
import com.yourcompany.touristappbackend.Repository.GuideRepository; // Nécessaire pour valider le Guide
import com.yourcompany.touristappbackend.Repository.TouristeRepository; // Nécessaire pour valider le Touriste
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Date; // Pour la date d'évaluation

/**
 * Service pour la gestion des opérations métier liées aux évaluations.
 * Gère la logique de création, lecture, mise à jour et suppression des évaluations.
 */
@Service
@Transactional // S'assure que toutes les opérations de cette classe sont exécutées dans une transaction
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final GuideRepository guideRepository; // Pour valider l'existence du guide
    private final TouristeRepository touristeRepository; // Pour valider l'existence du touriste

    /**
     * Constructeur avec injection de dépendances.
     * @param evaluationRepository Le repository pour les opérations de persistance des évaluations.
     * @param guideRepository Le repository pour accéder aux entités Guide.
     * @param touristeRepository Le repository pour accéder aux entités Touriste.
     */
    public EvaluationService(EvaluationRepository evaluationRepository,
                             GuideRepository guideRepository,
                             TouristeRepository touristeRepository) {
        this.evaluationRepository = evaluationRepository;
        this.guideRepository = guideRepository;
        this.touristeRepository = touristeRepository;
    }

    /**
     * Récupère toutes les évaluations.
     * @return Une liste de toutes les évaluations.
     */
    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    /**
     * Récupère une évaluation par son ID.
     * @param id L'ID de l'évaluation.
     * @return Un Optional contenant l'évaluation si trouvée, sinon vide.
     */
    public Optional<Evaluation> getEvaluationById(Long id) {
        return evaluationRepository.findById(id);
    }

    /**
     * Crée une nouvelle évaluation.
     * Valide l'existence du guide et du touriste associés avant la création.
     * @param evaluation L'objet Evaluation à créer.
     * @return L'évaluation créée.
     * @throws ResourceNotFoundException si le guide ou le touriste associé n'existe pas.
     * @throws IllegalArgumentException si les objets guide ou touriste sont manquants dans l'évaluation.
     */
    public Evaluation createEvaluation(Evaluation evaluation) {
        // Valider que le guide et le touriste associés existent
        if (evaluation.getGuide() == null || evaluation.getGuide().getId() == null) {
            throw new IllegalArgumentException("Le guide associé à l'évaluation est obligatoire.");
        }
        Guide existingGuide = guideRepository.findById(evaluation.getGuide().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Guide", "id", evaluation.getGuide().getId()));
        evaluation.setGuide(existingGuide); // Assurez-vous d'utiliser l'entité managée

        if (evaluation.getTouriste() == null || evaluation.getTouriste().getId() == null) {
            throw new IllegalArgumentException("Le touriste associé à l'évaluation est obligatoire.");
        }
        Touriste existingTouriste = touristeRepository.findById(evaluation.getTouriste().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", evaluation.getTouriste().getId()));
        evaluation.setTouriste(existingTouriste); // Assurez-vous d'utiliser l'entité managée

        // Définir la date d'évaluation si elle n'est pas déjà définie
        if (evaluation.getDateEvaluation() == null) {
            evaluation.setDateEvaluation(new Date());
        }

        return evaluationRepository.save(evaluation);
    }

    /**
     * Met à jour une évaluation existante.
     * Permet de modifier la note et le commentaire. Le guide et le touriste ne peuvent pas être modifiés.
     * @param id L'ID de l'évaluation à mettre à jour.
     * @param evaluationDetails L'objet Evaluation contenant les nouvelles données.
     * @return L'évaluation mise à jour.
     * @throws ResourceNotFoundException si aucune évaluation n'est trouvée avec l'ID donné.
     * @throws IllegalArgumentException si le guide ou le touriste associé est tenté de modifier.
     */
    public Evaluation updateEvaluation(Long id, Evaluation evaluationDetails) {
        Evaluation existingEvaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evaluation", "id", id));

        // Mettre à jour les champs modifiables
        if (evaluationDetails.getNote() != 0) { // Assurez-vous que 0 n'est pas une note valide si vous voulez la modifier
            existingEvaluation.setNote(evaluationDetails.getNote());
        }
        if (evaluationDetails.getCommentaire() != null && !evaluationDetails.getCommentaire().isEmpty()) {
            existingEvaluation.setCommentaire(evaluationDetails.getCommentaire());
        }
        // La date d'évaluation ne devrait pas être modifiée via cette méthode
        // Le guide et le touriste associés ne doivent pas être modifiés
        if (evaluationDetails.getGuide() != null && evaluationDetails.getGuide().getId() != null &&
                !evaluationDetails.getGuide().getId().equals(existingEvaluation.getGuide().getId())) {
            throw new IllegalArgumentException("Le guide associé à une évaluation ne peut pas être modifié.");
        }
        if (evaluationDetails.getTouriste() != null && evaluationDetails.getTouriste().getId() != null &&
                !evaluationDetails.getTouriste().getId().equals(existingEvaluation.getTouriste().getId())) {
            throw new IllegalArgumentException("Le touriste associé à une évaluation ne peut pas être modifié.");
        }

        return evaluationRepository.save(existingEvaluation);
    }

    /**
     * Supprime une évaluation par son ID.
     * @param id L'ID de l'évaluation à supprimer.
     * @throws ResourceNotFoundException si aucune évaluation n'est trouvée avec l'ID donné.
     */
    public void deleteEvaluation(Long id) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evaluation", "id", id));
        evaluationRepository.delete(evaluation);
    }

    /**
     * Récupère toutes les évaluations pour un guide spécifique.
     * @param guideId L'ID du guide.
     * @return Une liste d'évaluations pour le guide donné.
     */
    public List<Evaluation> getEvaluationsByGuideId(Long guideId) {
        return evaluationRepository.findByGuideId(guideId);
    }

    /**
     * Récupère toutes les évaluations faites par un touriste spécifique.
     * @param touristeId L'ID du touriste.
     * @return Une liste d'évaluations faites par le touriste donné.
     */
    public List<Evaluation> getEvaluationsByTouristeId(Long touristeId) {
        return evaluationRepository.findByTouristeId(touristeId);
    }
}