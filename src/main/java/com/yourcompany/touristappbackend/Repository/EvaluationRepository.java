package com.yourcompany.touristappbackend.Repository;

import com.yourcompany.touristappbackend.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByGuideId(Long guideId);
    List<Evaluation> findByTouristeId(Long touristeId);
    // Ajoutez d'autres méthodes de recherche si nécessaire
}