package com.yourcompany.touristappbackend.Repository;

import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.Touriste;
import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.StatutDemande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findByTouristeId(Long touristeId);
    List<Demande> findByGuideId(Long guideId);
    List<Demande> findByStatut(StatutDemande statut);
    boolean existsByTouristeAndGuideAndStatut(Touriste touriste, Guide guide, StatutDemande statut);
    // Ajoutez d'autres méthodes de recherche si nécessaire
}