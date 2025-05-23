package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.Role;
import com.yourcompany.touristappbackend.Repository.GuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuideService {

    @Autowired
    private GuideRepository guideRepository;

    public List<Guide> getAllGuides() {
        // Retourne tous les utilisateurs qui ont le rôle de GUIDE
        return guideRepository.findByRole(Role.ROLE_GUIDE);
    }

    public Optional<Guide> getGuideById(Long id) {
        return guideRepository.findById(id);
    }

    // Ajoutez d'autres méthodes de service si nécessaire (ex: créer, mettre à jour, supprimer un guide)
}