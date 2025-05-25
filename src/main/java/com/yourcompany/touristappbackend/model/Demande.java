package com.yourcompany.touristappbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder; // Ajoutez cette ligne si vous utilisez @Builder dans d'autres classes
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Date; // Assurez-vous d'avoir Date ou LocalDate/LocalTime si vous les utilisez pour d'autres champs

// Importations manquantes pour la version précédemment corrigée de Demande
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode; // Si vous utilisez @EqualsAndHashCode sur cette classe

@Entity
@Table(name = "demandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
// Si vous aviez @Builder ici avant, rajoutez-le
// @Builder
// Si vous aviez @EqualsAndHashCode ici avant, rajoutez-le
// @EqualsAndHashCode
public class Demande {

    @Id
    // Attention : @GeneratedValue(strategy = GenerationType.IDENTITY) est généralement pour les IDs numériques (Long, Integer) générés par la base de données.
    private Long id;

    private String description;

    // Attention : Date ou LocalDateTime ? Assurez-vous d'utiliser le même type que dans vos autres classes/services.
    // Si c'est un LocalDateTime, assurez-vous de la bonne persistance JPA (par ex. @Column(columnDefinition = "TIMESTAMP")).
    private LocalDateTime dateDemande;

    // C'est LA MODIFICATION CRUCIALE : Changez String en StatutDemande
    @Enumerated(EnumType.STRING) // Ceci indique à JPA de stocker le nom de l'énumération ("EN_ATTENTE", "ACCEPTEE", etc.) en tant que String dans la base de données.
    // Mais en Java, le type reste l'énumération.
    private StatutDemande statut; // Le type doit être votre énumération StatutDemande

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "touriste_id", nullable = false)
    private Touriste touriste;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guide_id")
    private Guide guide;

    // Les getters et setters générés par Lombok via @Data sont suffisants.
    // Vous n'avez pas besoin de les écrire explicitement si vous utilisez @Data.
    // Je les laisse commentés pour montrer, mais retirez-les pour ne pas dupliquer Lombok.
    /*
    public UUID getId() { return id; }
    public String getDescription() { return description; }
    public LocalDateTime getDateDemande() { return dateDemande; }
    public StatutDemande getStatut() { return statut; } // Changé de String à StatutDemande
    public Touriste getTouriste() { return touriste; }
    public Guide getGuide() { return guide; }

    public void setId(UUID id) { this.id = id; }
    public void setDescription(String description) { this.description = description; }
    public void setDateDemande(LocalDateTime dateDemande) { this.dateDemande = dateDemande; }
    public void setStatut(StatutDemande statut) { this.statut = statut; } // Changé de String à StatutDemande
    public void setTouriste(Touriste touriste) { this.touriste = touriste; }
    public void setGuide(Guide guide) { this.guide = guide; }
    */
}