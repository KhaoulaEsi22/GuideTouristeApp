package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.*;
import com.yourcompany.touristappbackend.Repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class TouristeService {

    private final TouristeRepository touristeRepository;
    private final DemandeRepository demandeRepository;
    private final EvaluationRepository evaluationRepository;
    private final PaiementRepository paiementRepository;
    private final GuideRepository guideRepository;

    public TouristeService(TouristeRepository touristeRepository,
                           DemandeRepository demandeRepository,
                           EvaluationRepository evaluationRepository,
                           PaiementRepository paiementRepository,
                           GuideRepository guideRepository) {
        this.touristeRepository = touristeRepository;
        this.demandeRepository = demandeRepository;
        this.evaluationRepository = evaluationRepository;
        this.paiementRepository = paiementRepository;
        this.guideRepository = guideRepository;
    }

    public List<Touriste> getAllTouristes() {
        return touristeRepository.findAll();
    }

    public Touriste getTouristeById(UUID id) {
        return touristeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", id));
    }

    public Touriste createTouriste(Touriste touriste) {
        return touristeRepository.save(touriste);
    }

    public Touriste updateTouriste(UUID id, Touriste touristeDetails) {
        Touriste touriste = touristeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", id));

        touriste.setEmail(touristeDetails.getEmail());
        touriste.setNom(touristeDetails.getNom());
        touriste.setPrenom(touristeDetails.getPrenom());
        touriste.setTelephone(touristeDetails.getTelephone());
        touriste.setPreferencesVoyage(touristeDetails.getPreferencesVoyage());
        touriste.setLanguePreferee(touristeDetails.getLanguePreferee());
        touriste.setNationalite(touristeDetails.getNationalite());
        touriste.setEstActif(touristeDetails.getEstActif());

        return touristeRepository.save(touriste);
    }

    public void deleteTouriste(UUID id) {
        Touriste touriste = touristeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Touriste", "id", id));
        touristeRepository.delete(touriste);
    }

    public boolean annulerDemande(UUID touristeId, UUID demandeId) {
        Touriste touriste = getTouristeById(touristeId);
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", demandeId));

        if (demande.getTouriste().getId().equals(touriste.getId()) &&
                (demande.getStatut() == StatutDemande.EN_ATTENTE || demande.getStatut() == StatutDemande.ACCEPTEE)) {
            demande.setStatut(StatutDemande.ANNULEE);
            demandeRepository.save(demande);
            return true;
        }
        return false;
    }

    public Paiement effectuerPaiement(UUID touristeId, UUID demandeId, Double montant, MethodePaiement methodePaiement) {
        Touriste touriste = getTouristeById(touristeId);
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", demandeId));

        if (!demande.getTouriste().getId().equals(touriste.getId())) {
            throw new IllegalArgumentException("La demande n'appartient pas à ce touriste.");
        }
        if (montant == null || montant <= 0) {
            throw new IllegalArgumentException("Le montant du paiement est invalide.");
        }
        if (methodePaiement == null) {
            throw new IllegalArgumentException("La méthode de paiement est obligatoire.");
        }

        Paiement paiement = Paiement.builder()
                .montant(montant)
                .methodePaiement(methodePaiement)
                .demande(demande)
                .build();

        return paiementRepository.save(paiement);
    }

    public Evaluation evaluerGuide(UUID touristeId, UUID guideId, int note, String commentaire) {
        Touriste touriste = getTouristeById(touristeId);
        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new ResourceNotFoundException("Guide", "id", guideId));

        Evaluation evaluation = Evaluation.builder()
                .note(note)
                .commentaire(commentaire)
                .touriste(touriste)
                .guide(guide)
                .build();

        return evaluationRepository.save(evaluation);
    }

    public boolean confirmerVisite(UUID touristeId, UUID demandeId) {
        Touriste touriste = getTouristeById(touristeId);
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", demandeId));

        if (demande.getTouriste().getId().equals(touriste.getId()) &&
                (demande.getStatut() == StatutDemande.EN_COURS || demande.getStatut() == StatutDemande.ACCEPTEE)) {
            demande.setStatut(StatutDemande.TERMINEE);
            demandeRepository.save(demande);
            return true;
        }
        return false;
    }
}

