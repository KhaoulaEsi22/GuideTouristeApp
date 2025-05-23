package com.yourcompany.touristappbackend.Controller;


import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.dto.GuideDto;
import com.yourcompany.touristappbackend.Service.GuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guides") // Endpoint pour les guides
public class GuideController {

    @Autowired
    private GuideService guideService;

    @GetMapping // Gère les requêtes GET à /api/guides
    public ResponseEntity<List<GuideDto>> getAllGuides() {
        List<Guide> guides = guideService.getAllGuides();
        // Convertir les entités Guide en GuideDto pour les envoyer au frontend
        List<GuideDto> guideDtos = guides.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(guideDtos, HttpStatus.OK);
    }

    // Méthode de conversion (peut être placée dans une classe utilitaire Mapper si beaucoup de DTOs)
    private GuideDto convertToDto(Guide guide) {
        GuideDto dto = new GuideDto();
        dto.setId(guide.getId());
        dto.setNom(guide.getNom());
        dto.setPrenom(guide.getNom()); // Correction si vous avez mis guide.getNom() deux fois
        dto.setEmail(guide.getEmail());
        dto.setTelephone(guide.getTelephone());
        dto.setBio(guide.getBio());
        dto.setLanguesParlees(guide.getLanguesParlees());
        dto.setTarifParHeure(guide.getTarifParHeure());
        return dto;
    }
}
