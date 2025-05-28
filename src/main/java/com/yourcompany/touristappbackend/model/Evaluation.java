package com.yourcompany.touristappbackend.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date; // Importez la classe Date

@Entity
@Table(name = "evaluations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int note; // Ex: sur 5
    private String commentaire;

    @Temporal(TemporalType.TIMESTAMP) // Spécifie le type de persistance pour la date
    private Date dateEvaluation; // <-- AJOUTÉ : Champ pour la date de l'évaluation

    @ManyToOne(fetch = FetchType.LAZY) // Plusieurs évaluations pour un seul guide
    @JoinColumn(name = "guide_id", nullable = false) // Clé étrangère vers la table des guides
    private Guide guide; // Le guide évalué

    @ManyToOne(fetch = FetchType.LAZY) // Plusieurs évaluations peuvent être faites par un seul touriste
    @JoinColumn(name = "touriste_id", nullable = false) // Clé étrangère vers la table des touristes
    private Touriste touriste; // Le touriste qui a laissé l'évaluation

    // Lombok's @Data annotation générera automatiquement les getters et setters,
    // y compris pour 'dateEvaluation'.
}