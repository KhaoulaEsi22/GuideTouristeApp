package com.yourcompany.touristappbackend.Repository;

import com.yourcompany.touristappbackend.model.Paiement;
import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.MethodePaiement; // <-- CORRIGÉ : Importe la nouvelle enum MethodePaiement
import com.yourcompany.touristappbackend.model.StatutDemande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    // Les opérations CRUD de base sont héritées de JpaRepository :
    // save(Paiement paiement)
    // findById(Long id)
    // findAll()
    // deleteById(Long id)
    // existsById(Long id)
    // count()

    /**
     * Trouve tous les paiements associés à une demande spécifique (par l'objet Demande).
     * Utile si vous avez déjà l'instance de Demande.
     * @param demande L'objet Demande.
     * @return Une liste de paiements.
     */
    List<Paiement> findByDemande(Demande demande);

    /**
     * Trouve tous les paiements associés à une demande spécifique par son ID.
     * C'est la méthode la plus courante pour les requêtes REST sur des IDs liés.
     * @param demandeId L'ID de la demande.
     * @return Une liste de paiements.
     */
    List<Paiement> findByDemandeId(Long demandeId); // <-- Ajoutée comme discuté

    /**
     * Trouve tous les paiements ayant un statut donné.
     * @param statut Le statut du paiement (par exemple, EN_ATTENTE, VALIDE, ECHOUE, REMBOURSE).
     * @return Une liste de paiements.
     */
    List<Paiement> findByStatut(StatutDemande.StatutPaiement statut);

    /**
     * Trouve un paiement par son ID de transaction unique.
     * @param transactionId L'ID de transaction unique.
     * @return Un Optional contenant le paiement si trouvé, sinon vide.
     */
    Optional<Paiement> findByTransactionId(String transactionId);

    /**
     * Trouve tous les paiements effectués avec une méthode de paiement spécifique.
     * @param methodePaiement La méthode de paiement (par exemple, CARTE_CREDIT, PAYPAL).
     * @return Une liste de paiements.
     */
    List<Paiement> findByMethodePaiement(MethodePaiement methodePaiement); // <-- CORRIGÉ : Utilise la nouvelle enum MethodePaiement

    /**
     * Trouve tous les paiements pour une demande spécifique avec un statut donné.
     * @param demande L'objet Demande.
     * @param statut Le statut du paiement.
     * @return Une liste de paiements.
     */
    List<Paiement> findByDemandeAndStatut(Demande demande, StatutDemande.StatutPaiement statut);
}