package com.yourcompany.touristappbackend.Service;

import com.yourcompany.touristappbackend.exception.ResourceNotFoundException;
import com.yourcompany.touristappbackend.model.User;
import com.yourcompany.touristappbackend.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Injection de dépendances via le constructeur (bonne pratique)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Récupère tous les utilisateurs enregistrés.
     * @return Une liste de tous les utilisateurs.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Récupère un utilisateur par son ID.
     * @param id L'UUID de l'utilisateur.
     * @return Un Optional contenant l'utilisateur s'il existe.
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Récupère un utilisateur par son email.
     * @param email L'adresse email de l'utilisateur.
     * @return Un Optional contenant l'utilisateur s'il existe.
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Crée un nouvel utilisateur.
     * IMPORTANT : Pour l'enregistrement avec hashage de mot de passe et gestion des rôles,
     * cette logique est généralement dans un AuthService.
     * Cette méthode ici est plus pour la gestion interne ou l'ajout d'utilisateurs par un admin.
     * @param user L'objet User à sauvegarder.
     * @return L'utilisateur sauvegardé.
     */
    @Transactional // S'assure que l'opération est atomique
    public User createUser(User user) {
        // Logique métier additionnelle avant sauvegarde, ex: validation plus poussée
        return userRepository.save(user);
    }

    /**
     * Met à jour un utilisateur existant.
     * @param id L'UUID de l'utilisateur à mettre à jour.
     * @param userDetails Les nouvelles informations de l'utilisateur.
     * @return L'utilisateur mis à jour.
     * @throws ResourceNotFoundException si l'utilisateur n'est pas trouvé.
     */
    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));

        // Mettre à jour les champs pertinents (exclure le mot de passe ici si c'est une méthode de profil général)
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());
        user.setEmail(userDetails.getEmail());
        user.setTelephone(userDetails.getTelephone());
        user.setEstActif(userDetails.getEstActif());
        user.setRole(userDetails.getRole()); // Un admin pourrait changer le rôle

        return userRepository.save(user);
    }

    /**
     * Désactive un utilisateur (au lieu de le supprimer physiquement).
     * @param id L'UUID de l'utilisateur à désactiver.
     * @throws ResourceNotFoundException si l'utilisateur n'est pas trouvé.
     */
    @Transactional
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        user.setEstActif(false); // Marquer l'utilisateur comme inactif
        userRepository.save(user);
    }

    /**
     * Supprime un utilisateur par son ID (suppression physique).
     * @param id L'UUID de l'utilisateur à supprimer.
     * @throws ResourceNotFoundException si l'utilisateur n'est pas trouvé.
     */
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }
}
