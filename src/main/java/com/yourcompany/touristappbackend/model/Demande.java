/*package com.yourcompany.touristappbackend.model;

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

} */
package com.yourcompany.touristappbackend.model; // Assurez-vous du bon package

import jakarta.persistence.*; // Utilisez jakarta.persistence si vous êtes sur Spring Boot 3+
import java.time.LocalDateTime;

@Entity
@Table(name = "demandes") // Nom de la table dans votre base de données
public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // C'est la clé de la solution !
    private Long id;

    private String title;
    private String description;
    private LocalDateTime date; // Ou LocalDate
    private String time;
    private String location;
    private Integer numberOfPeople;
    private String language;
    private String specialRequirements;

    @Enumerated(EnumType.STRING) // Pour stocker l'enum en tant que String dans la BD
    private StatutDemande statut;

    private LocalDateTime dateDemande; // Date de création de la demande

    @ManyToOne(fetch = FetchType.LAZY) // Relation Many-to-One avec Touriste
    @JoinColumn(name = "touriste_id", nullable = false) // Colonne de clé étrangère
    private Touriste touriste;

    @ManyToOne(fetch = FetchType.LAZY) // Relation Many-to-One avec Guide (optionnel, peut être null au début)
    @JoinColumn(name = "guide_id") // La colonne sera nullable
    private Guide guide;

    // Constructeurs (vide et/ou avec des champs)
    public Demande() {
    }

    // Getters et Setters pour tous les champs
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() { // Ou LocalDate
        return date;
    }

    public void setDate(LocalDateTime date) { // Ou LocalDate
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getSpecialRequirements() {
        return specialRequirements;
    }

    public void setSpecialRequirements(String specialRequirements) {
        this.specialRequirements = specialRequirements;
    }

    public StatutDemande getStatut() {
        return statut;
    }

    public void setStatut(StatutDemande statut) {
        this.statut = statut;
    }

    public LocalDateTime getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(LocalDateTime dateDemande) {
        this.dateDemande = dateDemande;
    }

    public Touriste getTouriste() {
        return touriste;
    }

    public void setTouriste(Touriste touriste) {
        this.touriste = touriste;
    }

    public Guide getGuide() {
        return guide;
    }

    public void setGuide(Guide guide) {
        this.guide = guide;
    }
}