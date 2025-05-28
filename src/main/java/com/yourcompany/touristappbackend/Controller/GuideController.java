package com.yourcompany.touristappbackend.Controller;


import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.dto.GuideDto;
import com.yourcompany.touristappbackend.Service.GuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Assurez-vous d'avoir tous les imports nécessaires

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional; // Pour Optional dans getGuideById
import com.yourcompany.touristappbackend.exception.ResourceNotFoundException; // Pour l'exception

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    @Autowired
    private GuideService guideService;

    @GetMapping
    public ResponseEntity<List<GuideDto>> getAllGuides() {
        List<Guide> guides = guideService.getAllGuides();
        List<GuideDto> guideDtos = guides.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(guideDtos, HttpStatus.OK);
    }

    // Ajout de la méthode GET par ID, cruciale pour résoudre le 404 sur des requêtes spécifiques
    @GetMapping("/{id}") // C'est l'annotation qui map l'URL /api/guides/{id}
    public ResponseEntity<GuideDto> getGuideById(@PathVariable Long id) {
        Guide guide = guideService.getGuideById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guide non trouvé avec l'ID : " + id));
        return ResponseEntity.ok(convertToDto(guide));
    }

    @PutMapping("/{id}/details")
    public ResponseEntity<GuideDto> updateGuideDetails(@PathVariable Long id, @RequestBody GuideDto guideDto) {
        // Ajouter ici une logique de sécurité si nécessaire (ex: vérifier que l'utilisateur est le guide lui-même ou un ADMIN)
        // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // ... (votre logique de sécurité) ...

        Guide updatedGuide = guideService.updateGuideDetails(id, guideDto);
        return ResponseEntity.ok(convertToDto(updatedGuide));
    }

    // Endpoint pour la suppression d'un guide (à ajouter si nécessaire)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuide(@PathVariable Long id) {
        guideService.deleteGuide(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    private GuideDto convertToDto(Guide guide) {
        GuideDto dto = new GuideDto();
        dto.setId(guide.getId());
        dto.setNom(guide.getNom());
        dto.setPrenom(guide.getPrenom());
        dto.setEmail(guide.getEmail());
        dto.setTelephone(guide.getTelephone());
        dto.setBio(guide.getBio());
        dto.setLanguesParlees(guide.getLanguesParlees());
        dto.setTarifParHeure(guide.getTarifParHeure());
        return dto;
    }
}