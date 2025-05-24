package com.yourcompany.touristappbackend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Cette annotation renvoie un statut 404 Not Found
public class ResourceNotFoundException extends RuntimeException {

    // Constructeur actuel : prend un message simple
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Constructeur actuel : prend un message et une cause (Throwable)
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    // NOUVEAU CONSTRUCTEUR AJOUTÉ : permet de spécifier la ressource, le champ et la valeur
    // C'est celui qui résoudra l'erreur dans vos services
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s non trouvé avec %s : '%s'", resourceName, fieldName, fieldValue));
        // Vous pouvez ajouter des champs pour stocker resourceName, fieldName, fieldValue si vous en avez besoin plus tard,
        // mais pour l'erreur actuelle, seul le message formaté est nécessaire.
    }
}
