package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.Repository.UserRepository;
import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.Guide;
import com.yourcompany.touristappbackend.model.Role;
import com.yourcompany.touristappbackend.model.User;
import com.yourcompany.touristappbackend.dto.GuideDto;
import com.yourcompany.touristappbackend.Repository.GuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GuideService {

    @Autowired
    private GuideRepository guideRepository;
    private UserRepository userRepository; // Non @Autowired ici, il faut ajouter @Autowired ou le laisser dans le constructeur

    @Autowired // Constructeur pour injection de dépendances
    public GuideService(GuideRepository guideRepository, UserRepository userRepository) {
        this.guideRepository = guideRepository;
        this.userRepository = userRepository;
    }

    // Problème potentiel: findAll() ne filtre pas par rôle, et findByRole n'existe peut-être pas dans GuideRepository
    public List<Guide> getAllGuides() {
        // Retourne tous les utilisateurs qui ont le rôle de GUIDE
        // return guideRepository.findByRole(Role.ROLE_GUIDE); // <--- Ceci est probablement une erreur
        // Si GuideRepository étend JpaRepository<Guide, Long>, il ne contient pas findByRole par défaut.
        // Option 1: Récupérer tous les Guides, car un Guide est déjà un User avec ROLE_GUIDE (stratégie JOINED)
        return guideRepository.findAll();
        // Option 2: Si vous voulez filtrer par rôle directement via UserRepository (moins direct pour GuideService)
        // return userRepository.findByRoles_Name(ERole.ROLE_GUIDE).stream()
        //         .filter(user -> user instanceof Guide)
        //         .map(user -> (Guide) user)
        //         .collect(Collectors.toList());
    }

    public Optional<Guide> getGuideById(Long id) {
        return guideRepository.findById(id);
    }

    @Transactional
    public Guide createGuideFromUser(User user) {
        // ... (Logique actuelle) ...
        Optional<Guide> existingGuide = guideRepository.findById(user.getId());
        if (existingGuide.isPresent()) {
            return existingGuide.get();
        }

        Guide guide = new Guide();
        // L'ID est géré par JPA si Guide étend User et que l'ID est hérité.
        // Pas besoin de setId(user.getId()) explicitement ici.

        guide.setBio("");
        guide.setLanguesParlees("");
        guide.setTarifParHeure(0.0);

        // Si votre Guide a une référence explicite à User (ex: @OneToOne avec @MapsId), vous pourriez devoir la définir.
        // Par exemple: guide.setUser(user); si vous avez un champ 'user' dans Guide.
        // Sinon, si Guide étend directement User, c'est géré par l'héritage.

        return guideRepository.save(guide); // Sauvegarde l'entité Guide
    }


    @Transactional
    public Guide updateGuideDetails(Long id, GuideDto guideDto) {
        Guide existingGuide = guideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guide non trouvé avec l'ID : " + id));

        // Ces setters mettent à jour les champs directement sur l'objet 'Guide'
        // qui hérite de 'User'. Cela devrait fonctionner si Lombok est correctement configuré.
        existingGuide.setNom(guideDto.getNom());
        existingGuide.setPrenom(guideDto.getPrenom());
        existingGuide.setEmail(guideDto.getEmail());
        existingGuide.setTelephone(guideDto.getTelephone());

        // Champs spécifiques au Guide
        existingGuide.setBio(guideDto.getBio());
        existingGuide.setLanguesParlees(guideDto.getLanguesParlees());
        existingGuide.setTarifParHeure(guideDto.getTarifParHeure());

        return guideRepository.save(existingGuide); // Sauvegarde les changements
    }

    @Transactional
    public void deleteGuide(Long id) {
        Guide guide = guideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guide non trouvé avec l'ID : " + id));
        guideRepository.delete(guide);
        // Si la suppression du Guide doit aussi entraîner la suppression de l'User associé:
        // userRepository.deleteById(id); // Si l'ID du Guide est le même que l'ID de l'User
    }
}


