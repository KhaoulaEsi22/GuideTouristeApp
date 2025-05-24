package com.yourcompany.touristappbackend.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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

    @ManyToOne(fetch = FetchType.LAZY) // Plusieurs évaluations pour un seul guide
    @JoinColumn(name = "guide_id", nullable = false) // Clé étrangère vers la table des guides
    private Guide guide; // Le guide évalué

    @ManyToOne(fetch = FetchType.LAZY) // Plusieurs évaluations peuvent être faites par un seul touriste
    @JoinColumn(name = "touriste_id", nullable = false) // Clé étrangère vers la table des touristes
    private Touriste touriste; // Le touriste qui a laissé l'évaluation

    // Constructeurs, Getters, Setters
}
