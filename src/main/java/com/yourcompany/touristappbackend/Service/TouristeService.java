package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.Touriste;
import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.Paiement;
import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.Evaluation; // Assurez-vous que cette classe existe
import com.yourcompany.touristappbackend.model.MethodePaiement; // <-- Import corrigé
import com.yourcompany.touristappbackend.model.StatutDemande; // Pour StatutDemande et StatutPaiement
import com.yourcompany.touristappbackend.Repository.TouristeRepository;
import com.yourcompany.touristappbackend.Repository.DemandeRepository;
import com.yourcompany.touristappbackend.Repository.PaiementRepository;
import com.yourcompany.touristappbackend.Repository.GuideRepository; // Pour évaluer un guide

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Date; // Pour la date de paiement

@Service
@Transactional
public class TouristeService {

    private final TouristeRepository touristeRepository;
    private final DemandeRepository demandeRepository;
    private final PaiementRepository paiementRepository;
    private final GuideRepository guideRepository; // Ajouté pour la méthode evaluerGuide

    public TouristeService(TouristeRepository touristeRepository,
                           DemandeRepository demandeRepository,
                           PaiementRepository paiementRepository,
                           GuideRepository guideRepository) {
        this.touristeRepository = touristeRepository;
        this.demandeRepository = demandeRepository;
        this.paiementRepository = paiementRepository;
        this.guideRepository = guideRepository;
    }

    public List<Touriste> getAllTouristes() {
        return touristeRepository.findAll();
    }

    public Touriste getTouristeById(Long id) {
        return touristeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", id));
    }

    public Touriste createTouriste(Touriste touriste) {
        return touristeRepository.save(touriste);
    }

    public Touriste updateTouriste(Long id, Touriste touristeDetails) {
        Touriste touriste = touristeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", id));

        touriste.setNom(touristeDetails.getNom());
        touriste.setPrenom(touristeDetails.getPrenom());
        touriste.setEmail(touristeDetails.getEmail());
        touriste.setTelephone(touristeDetails.getTelephone());
        // Mettez à jour d'autres champs si nécessaire

        return touristeRepository.save(touriste);
    }

    public void deleteTouriste(Long id) {
        Touriste touriste = touristeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", id));
        touristeRepository.delete(touriste);
    }

    /**
     * Permet à un touriste d'annuler sa demande.
     *
     * @param touristeId L'ID du touriste.
     * @param demandeId  L'ID de la demande à annuler.
     * @return true si l'annulation est réussie, false sinon.
     * @throws ResourceNotFoundException si le touriste ou la demande n'est pas trouvée.
     * @throws IllegalArgumentException  si la demande n'appartient pas au touriste ou ne peut être annulée.
     */
    public boolean annulerDemande(Long touristeId, Long demandeId) {
        Touriste touriste = touristeRepository.findById(touristeId)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", touristeId));
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", demandeId));

        if (!demande.getTouriste().getId().equals(touristeId)) {
            throw new IllegalArgumentException("La demande n'appartient pas à ce touriste.");
        }

        if (demande.getStatut() == StatutDemande.EN_ATTENTE || demande.getStatut() == StatutDemande.ACCEPTEE) {
            demande.setStatut(StatutDemande.ANNULEE);
            demandeRepository.save(demande);
            return true;
        } else {
            throw new IllegalArgumentException("La demande ne peut pas être annulée dans son état actuel (" + demande.getStatut() + ").");
        }
    }

    /**
     * Permet à un touriste d'effectuer un paiement pour une demande.
     *
     * @param touristeId L'ID du touriste effectuant le paiement.
     * @param demandeId  L'ID de la demande associée au paiement.
     * @param montant    Le montant du paiement.
     * @param methode    La méthode de paiement.
     * @return L'objet Paiement créé.
     * @throws ResourceNotFoundException si le touriste ou la demande n'est pas trouvée.
     * @throws IllegalArgumentException  si la demande n'appartient pas au touriste.
     */
    public Paiement effectuerPaiement(Long touristeId, Long demandeId, Double montant, MethodePaiement methode) { // <-- CORRIGÉ : utilise MethodePaiement
        Touriste touriste = touristeRepository.findById(touristeId)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", touristeId));
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", demandeId));

        if (!demande.getTouriste().getId().equals(touristeId)) {
            throw new IllegalArgumentException("La demande n'appartient pas à ce touriste.");
        }

        // Créez le paiement
        Paiement paiement = Paiement.builder()
                .montant(montant)
                .methodePaiement(methode)
                .demande(demande)
                .datePaiement(new Date())
                .statut(StatutDemande.StatutPaiement.EN_ATTENTE) // Statut initial
                .transactionId(java.util.UUID.randomUUID().toString()) // Générer un ID de transaction simple
                .build();

        // Enregistrer le paiement
        Paiement savedPaiement = paiementRepository.save(paiement);

        // Optionnel: Mettre à jour le statut de la demande si le paiement est initié ou validé
        // demande.setStatut(StatutDemande.EN_COURS); // Ou un statut comme PAYEE_EN_ATTENTE
        // demandeRepository.save(demande);

        return savedPaiement;
    }

    /**
     * Permet à un touriste d'évaluer un guide.
     *
     * @param touristeId  L'ID du touriste.
     * @param guideId     L'ID du guide à évaluer.
     * @param note        La note donnée (ex: 1 à 5).
     * @param commentaire Le commentaire de l'évaluation.
     * @return L'objet Evaluation créé.
     * @throws ResourceNotFoundException si le touriste ou le guide n'est pas trouvé.
     */
    public Evaluation evaluerGuide(Long touristeId, Long guideId, int note, String commentaire) {
        Touriste touriste = touristeRepository.findById(touristeId)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", touristeId));
        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide", "id", guideId));

        // Enregistrez l'évaluation (vous aurez besoin d'un EvaluationRepository)
        // Pour l'exemple, nous allons créer une instance d'Evaluation et la retourner.
        // Dans une vraie application, vous la sauvegarderiez via un repository.
        Evaluation evaluation = new Evaluation();
        // Assurez-vous que la classe Evaluation a des setters pour ces champs
        evaluation.setTouriste(touriste);
        evaluation.setGuide(guide);
        evaluation.setNote(note);
        evaluation.setCommentaire(commentaire);
        evaluation.setDateEvaluation(new Date()); // Définir la date de l'évaluation

        // Si vous avez un EvaluationRepository, décommentez et utilisez-le :
        // return evaluationRepository.save(evaluation);

        return evaluation; // Pour l'exemple sans EvaluationRepository
    }

    /**
     * Permet à un touriste de confirmer qu'une visite a eu lieu.
     *
     * @param touristeId L'ID du touriste.
     * @param demandeId  L'ID de la demande à confirmer.
     * @return true si la confirmation est réussie, false sinon.
     * @throws ResourceNotFoundException si le touriste ou la demande n'est pas trouvée.
     * @throws IllegalArgumentException  si la demande n'appartient pas au touriste ou ne peut être confirmée.
     */
    public boolean confirmerVisite(Long touristeId, Long demandeId) {
        Touriste touriste = touristeRepository.findById(touristeId)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", touristeId));
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", demandeId));

        if (!demande.getTouriste().getId().equals(touristeId)) {
            throw new IllegalArgumentException("La demande n'appartient pas à ce touriste.");
        }

        // Une demande ne peut être confirmée que si elle est ACCEPTEE ou EN_COURS
        if (demande.getStatut() == StatutDemande.ACCEPTEE || demande.getStatut() == StatutDemande.EN_COURS) {
            demande.setStatut(StatutDemande.TERMINEE); // Marquer la demande comme terminée après confirmation
            demandeRepository.save(demande);
            return true;
        } else {
            throw new IllegalArgumentException("La demande ne peut pas être confirmée dans son état actuel (" + demande.getStatut() + ").");
        }
    }
}

