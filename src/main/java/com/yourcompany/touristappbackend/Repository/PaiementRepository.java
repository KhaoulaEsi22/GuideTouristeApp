package com.yourcompany.touristappbackend.Repository;

import com.yourcompany.touristappbackend.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, UUID> {
    List<Paiement> findByDemandeId(UUID demandeId);
    // Ajoutez d'autres méthodes de recherche si nécessaire
}