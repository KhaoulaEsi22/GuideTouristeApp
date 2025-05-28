package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.StatutDemande;
import com.yourcompany.touristappbackend.model.Touriste;
import com.yourcompany.touristappbackend.Repository.DemandeRepository;
import com.yourcompany.touristappbackend.Repository.GuideRepository;
import com.yourcompany.touristappbackend.Repository.TouristeRepository;
import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DemandeService {

    private final DemandeRepository demandeRepository;
    private final TouristeRepository touristeRepository;
    private final GuideRepository guideRepository;

    @Autowired
    public DemandeService(DemandeRepository demandeRepository,
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
    public List<Demande> getAllDemandes() {
        return demandeRepository.findAll();
    }

    /**
     * Récupère une demande par son ID.
     * @param id L'ID de la demande.
     * @return La demande correspondante.
     * @throws ResourceNotFoundException si la demande n'est pas trouvée.
     */
    public Demande getDemandeById(Long id) {
        return demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));
    }

    /**
     * Crée une nouvelle demande.
     * @param demande La demande à créer (sans ID, dateDemande, statut, touriste, guide initialisés).
     * @param touristeId L'ID du touriste qui fait la demande.
     * @return La demande créée.
     * @throws ResourceNotFoundException si le touriste n'est pas trouvé.
     */
    public Demande createDemande(Demande demande, Long touristeId) {
        Touriste touriste = touristeRepository.findById(touristeId)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste non trouvé avec l'ID : " + touristeId));

        demande.setTouriste(touriste);
        demande.setDateDemande(LocalDateTime.now());
        demande.setStatut(StatutDemande.EN_ATTENTE); // Nouvelle demande est toujours en attente
        return demandeRepository.save(demande);
    }

    /**
     * Met à jour une demande existante.
     * Permet de modifier la description d'une demande.
     * @param id L'ID de la demande à mettre à jour.
     * @param demandeDetails Les détails de la demande mis à jour.
     * @return La demande mise à jour.
     * @throws ResourceNotFoundException si la demande n'est pas trouvée.
     */
    public Demande updateDemande(Long id, Demande demandeDetails) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        demande.setDescription(demandeDetails.getDescription());
        // Les changements de statut et de guide doivent passer par des méthodes spécifiques (accepter/refuser/annuler/terminer)
        return demandeRepository.save(demande);
    }

    /**
     * Supprime une demande par son ID.
     * @param id L'ID de la demande à supprimer.
     * @throws ResourceNotFoundException si la demande n'est pas trouvée.
     */
    public void deleteDemande(Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));
        demandeRepository.delete(demande);
    }

    /**
     * Récupère toutes les demandes faites par un touriste spécifique.
     * @param touristeId L'ID du touriste.
     * @return Une liste de demandes.
     */
    public List<Demande> getDemandesByTouristeId(Long touristeId) {
        return demandeRepository.findByTouristeId(touristeId);
    }

    /**
     * Récupère toutes les demandes adressées à un guide spécifique.
     * @param guideId L'ID du guide.
     * @return Une liste de demandes.
     */
    public List<Demande> getDemandesByGuideId(Long guideId) {
        return demandeRepository.findByGuideId(guideId);
    }

    /**
     * Récupère toutes les demandes avec un statut spécifique.
     * @param statut Le statut de la demande.
     * @return Une liste de demandes.
     */
    public List<Demande> getDemandesByStatut(StatutDemande statut) {
        return demandeRepository.findByStatut(statut);
    }

    /**
     * Permet à un guide d'accepter une demande.
     * @param id L'ID de la demande à accepter.
     * @param guideId L'ID du guide qui accepte la demande.
     * @return La demande mise à jour avec le statut ACCEPTEE.
     * @throws ResourceNotFoundException si la demande ou le guide n'est pas trouvé.
     * @throws IllegalArgumentException si la demande n'est pas en attente.
     */
    public Demande accepterDemande(Long id, Long guideId) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide non trouvé avec l'ID : " + guideId));

        if (demande.getStatut() == StatutDemande.EN_ATTENTE) {
            demande.setStatut(StatutDemande.ACCEPTEE);
            demande.setGuide(guide);
            return demandeRepository.save(demande);
        } else {
            throw new IllegalArgumentException("La demande n'est pas en attente et ne peut pas être acceptée.");
        }
    }

    /**
     * Permet à un guide de refuser une demande.
     * @param id L'ID de la demande à refuser.
     * @return La demande mise à jour avec le statut REFUSEE.
     * @throws ResourceNotFoundException si la demande n'est pas trouvée.
     * @throws IllegalArgumentException si la demande n'est pas en attente.
     */
    public Demande refuserDemande(Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        if (demande.getStatut() == StatutDemande.EN_ATTENTE) {
            demande.setStatut(StatutDemande.REFUSEE);
            demande.setGuide(null); // Dissocier le guide si un guide était déjà assigné temporairement
            return demandeRepository.save(demande);
        } else {
            throw new IllegalArgumentException("La demande n'est pas en attente et ne peut pas être refusée.");
        }
    }

    /**
     * Permet à un touriste d'annuler sa demande.
     * @param id L'ID de la demande à annuler.
     * @return La demande mise à jour avec le statut ANNULEE.
     * @throws ResourceNotFoundException si la demande n'est pas trouvée.
     * @throws IllegalArgumentException si la demande ne peut pas être annulée dans son état actuel.
     */
    public Demande annulerDemande(Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        if (demande.getStatut() == StatutDemande.EN_ATTENTE || demande.getStatut() == StatutDemande.ACCEPTEE) {
            demande.setStatut(StatutDemande.ANNULEE);
            return demandeRepository.save(demande);
        } else {
            throw new IllegalArgumentException("Impossible d'annuler la demande dans son état actuel.");
        }
    }

    /**
     * Permet de marquer une demande comme terminée.
     * @param id L'ID de la demande à terminer.
     * @return La demande mise à jour avec le statut TERMINEE.
     * @throws ResourceNotFoundException si la demande n'est pas trouvée.
     * @throws IllegalArgumentException si la demande ne peut pas être terminée dans son état actuel.
     */
    public Demande terminerDemande(Long id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande non trouvée avec l'ID : " + id));

        if (demande.getStatut() == StatutDemande.ACCEPTEE) {
            demande.setStatut(StatutDemande.TERMINEE);
            return demandeRepository.save(demande);
        } else {
            throw new IllegalArgumentException("La demande n'est pas dans un état où elle peut être terminée.");
        }
    }
}

