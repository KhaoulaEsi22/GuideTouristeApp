package com.yourcompany.touristappbackend.Repository;
import com.yourcompany.touristappbackend.model.Touriste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TouristeRepository extends JpaRepository<Touriste, Long> {
    Optional<Touriste> findByEmail(String email);
    // Ajoutez d'autres méthodes de recherche si nécessaire
}