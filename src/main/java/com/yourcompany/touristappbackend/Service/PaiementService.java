package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.Paiement;
import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.MethodePaiement;
import com.yourcompany.touristappbackend.model.StatutDemande;
import com.yourcompany.touristappbackend.Repository.PaiementRepository;
import com.yourcompany.touristappbackend.Repository.DemandeRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PaiementService {

    private final PaiementRepository paiementRepository;
    private final DemandeRepository demandeRepository;

    public PaiementService(PaiementRepository paiementRepository, DemandeRepository demandeRepository) {
        this.paiementRepository = paiementRepository;
        this.demandeRepository = demandeRepository;
    }

    public List<Paiement> getAllPaiements() {
        return paiementRepository.findAll();
    }

    public Optional<Paiement> getPaiementById(Long id) {
        return paiementRepository.findById(id);
    }

    public Paiement createPaiement(Paiement paiement) {
        if (paiement.getDemande() == null || paiement.getDemande().getId() == null) {
            throw new IllegalArgumentException("La demande associée au paiement est obligatoire.");
        }
        Demande existingDemande = demandeRepository.findById(paiement.getDemande().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Demande", "id", paiement.getDemande().getId()));
        paiement.setDemande(existingDemande);

        if (paiement.getStatut() == null) {
            paiement.setStatut(StatutDemande.StatutPaiement.EN_ATTENTE);
        }
        if (paiement.getTransactionId() == null || paiement.getTransactionId().isEmpty()) {
            paiement.setTransactionId(UUID.randomUUID().toString());
        }

        Paiement savedPaiement = paiementRepository.save(paiement);
        return savedPaiement;
    }

    public Paiement updatePaiement(Long id, Paiement paiementDetails) {
        Paiement paiement = paiementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement", "id", id));

        if (paiementDetails.getMontant() != null) {
            paiement.setMontant(paiementDetails.getMontant());
        }
        if (paiementDetails.getMethodePaiement() != null) {
            paiement.setMethodePaiement(paiementDetails.getMethodePaiement());
        }
        if (paiementDetails.getTransactionId() != null && !paiementDetails.getTransactionId().isEmpty()) {
            paiement.setTransactionId(paiementDetails.getTransactionId());
        }

        if (paiementDetails.getStatut() != null && paiementDetails.getStatut() != paiement.getStatut()) {
            if (paiement.getStatut() == StatutDemande.StatutPaiement.EN_ATTENTE &&
                    (paiementDetails.getStatut() == StatutDemande.StatutPaiement.VALIDE ||
                            paiementDetails.getStatut() == StatutDemande.StatutPaiement.ECHOUE)) {
                paiement.setStatut(paiementDetails.getStatut());
            } else if (paiement.getStatut() == StatutDemande.StatutPaiement.VALIDE &&
                    paiementDetails.getStatut() == StatutDemande.StatutPaiement.REMBOURSE) {
                paiement.setStatut(paiementDetails.getStatut());
            } else {
                throw new IllegalArgumentException("Transition de statut non valide de " +
                        paiement.getStatut() + " vers " + paiementDetails.getStatut());
            }
        }

        if (paiementDetails.getDemande() != null && paiementDetails.getDemande().getId() != null &&
                !paiementDetails.getDemande().getId().equals(paiement.getDemande().getId())) {
            throw new IllegalArgumentException("La demande associée à un paiement ne peut pas être modifiée.");
        }

        return paiementRepository.save(paiement);
    }

    public void deletePaiement(Long id) {
        Paiement paiement = paiementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement", "id", id));
        paiementRepository.delete(paiement);
    }

    public List<Paiement> getPaiementsByDemande(Demande demande) {
        return paiementRepository.findByDemande(demande);
    }

    /**
     * Récupère tous les paiements associés à une demande spécifique par son ID.
     * Cette méthode a été ajoutée pour correspondre à l'appel dans le contrôleur.
     * @param demandeId L'ID de la demande.
     * @return Une liste de paiements associés à cette demande.
     */
    public List<Paiement> getPaiementsByDemandeId(Long demandeId) {
        return paiementRepository.findByDemandeId(demandeId);
    }

    public List<Paiement> getPaiementsByStatut(StatutDemande.StatutPaiement statut) {
        return paiementRepository.findByStatut(statut);
    }

    public List<Paiement> getPaiementsByMethodePaiement(MethodePaiement methodePaiement) {
        return paiementRepository.findByMethodePaiement(methodePaiement);
    }

    public Optional<Paiement> getPaiementByTransactionId(String transactionId) {
        return paiementRepository.findByTransactionId(transactionId);
    }

    public Paiement traiterPaiement(Long paiementId) {
        Paiement paiement = paiementRepository.findById(paiementId)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement", "id", paiementId));

        if (paiement.getStatut() != StatutDemande.StatutPaiement.EN_ATTENTE) {
            throw new IllegalArgumentException("Le paiement n'est pas en attente et ne peut pas être traité.");
        }

        boolean success = true;
        if (success) {
            paiement.setStatut(StatutDemande.StatutPaiement.VALIDE);
        } else {
            paiement.setStatut(StatutDemande.StatutPaiement.ECHOUE);
        }
        return paiementRepository.save(paiement);
    }

    public Paiement annulerPaiement(Long paiementId) {
        Paiement paiement = paiementRepository.findById(paiementId)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement", "id", paiementId));

        if (paiement.getStatut() == StatutDemande.StatutPaiement.VALIDE) {
            paiement.setStatut(StatutDemande.StatutPaiement.REMBOURSE);
        } else if (paiement.getStatut() == StatutDemande.StatutPaiement.EN_ATTENTE) {
            paiement.setStatut(StatutDemande.StatutPaiement.ECHOUE);
        } else if (paiement.getStatut() == StatutDemande.StatutPaiement.ECHOUE ||
                paiement.getStatut() == StatutDemande.StatutPaiement.REMBOURSE) {
            throw new IllegalArgumentException("Le paiement est déjà dans un statut final et ne peut pas être annulé/remboursé.");
        } else {
            throw new IllegalArgumentException("Statut de paiement actuel (" + paiement.getStatut() + ") ne permet pas l'annulation.");
        }
        return paiementRepository.save(paiement);
    }
}
