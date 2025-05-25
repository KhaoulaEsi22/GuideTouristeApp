package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.Paiement;
import com.yourcompany.touristappbackend.Repository.PaiementRepository; // Correction du package si nécessaire
import com.yourcompany.touristappbackend.Repository.DemandeRepository; // Correction du package si nécessaire // Injection nécessaire
import com.yourcompany.touristappbackend.model.StatutDemande; // Ajouté pour l'exemple d'utilisation de demandeRepository

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PaiementService {

    private final PaiementRepository paiementRepository;
    private final DemandeRepository demandeRepository; // Ce champ est correctement déclaré

    public PaiementService(PaiementRepository paiementRepository, DemandeRepository demandeRepository) {
        this.paiementRepository = paiementRepository;
        this.demandeRepository = demandeRepository; // Et correctement assigné dans le constructeur
    }

    public List<Paiement> getAllPaiements() {
        return paiementRepository.findAll();
    }

    public Paiement getPaiementById(Long id) {
        // Correction de l'ordre des arguments pour ResourceNotFoundException
        return paiementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement", "id", id));
    }

    public Paiement createPaiement(Paiement paiement) {
        // Logique de traitement du paiement (intégration passerelle, etc.)
        // Mise à jour du statut initial
        paiement.setStatut(StatutDemande.StatutPaiement.EN_ATTENTE); // Ou directement VALIDE si traitement instantané
        Paiement savedPaiement = paiementRepository.save(paiement);

        // Exemple: Si le paiement est réussi, mettre à jour le statut de la demande associée
        // Décommentez et adaptez cette section si vous voulez utiliser demandeRepository ici
        // if (savedPaiement.getStatut() == StatutPaiement.VALIDE) {
        //     Demande demande = savedPaiement.getDemande();
        //     // Assurez-vous que StatutDemande.PAYEE existe dans votre enum StatutDemande
        //     // Ou utilisez un statut existant comme StatutDemande.TERMINEE si le paiement finalise la demande
        //     // demande.setStatut(StatutDemande.TERMINEE);
        //     // demandeRepository.save(demande);
        // }

        return savedPaiement;
    }

    public Paiement updatePaiement(Long id, Paiement paiementDetails) {
        Paiement paiement = getPaiementById(id);

        // Mettre à jour les champs autorisés
        paiement.setMontant(paiementDetails.getMontant());
        paiement.setMethodePaiement(paiementDetails.getMethodePaiement());
        paiement.setStatut(paiementDetails.getStatut()); // Attention: ne pas permettre n'importe quelle transition de statut ici
        paiement.setTransactionId(paiementDetails.getTransactionId());
        // La demande ne doit pas être modifiée ici

        return paiementRepository.save(paiement);
    }

    public void deletePaiement(Long id) {
        Paiement paiement = getPaiementById(id);
        paiementRepository.delete(paiement);
    }

    // Méthodes métier spécifiques (selon le diagramme)
    public Paiement traiterPaiement(Long paiementId) {
        Paiement paiement = getPaiementById(paiementId);
        // Logique de traitement (simulation d'une interaction avec une passerelle)
        // Si le traitement réussit
        paiement.setStatut(StatutDemande.StatutPaiement.VALIDE);
        // Si échec
        // paiement.setStatut(StatutPaiement.ECHOUE);
        return paiementRepository.save(paiement);
    }

    public Paiement annulerPaiement(Long paiementId) {
        Paiement paiement = getPaiementById(paiementId);
        // Logique d'annulation (peut impliquer un remboursement)
        if (paiement.getStatut() == StatutDemande.StatutPaiement.VALIDE) {
            paiement.setStatut(StatutDemande.StatutPaiement.REMBOURSE);
        } else if (paiement.getStatut() == StatutDemande.StatutPaiement.EN_ATTENTE) {
            paiement.setStatut(StatutDemande.StatutPaiement.ECHOUE); // Ou annulé sans remboursement
        }
        return paiementRepository.save(paiement);
    }
}