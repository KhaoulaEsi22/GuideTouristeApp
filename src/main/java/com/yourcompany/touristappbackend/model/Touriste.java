package com.yourcompany.touristappbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import lombok.EqualsAndHashCode;
import lombok.Builder; // Ajouté pour @Builder.Default

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "touristes")
@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true) // Important: callSuper=true car Touriste hérite de User
public class Touriste extends User {

    private String preferencesVoyage;
    private String languePreferee;
    private String nationalite;

    @OneToMany(mappedBy = "touriste", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private Set<Demande> demandesFaites = new HashSet<>();

    @OneToMany(mappedBy = "touriste", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private Set<Evaluation> evaluationsFaites = new HashSet<>();

    public void addDemande(Demande demande) {
        this.demandesFaites.add(demande);
        demande.setTouriste(this);
    }

    public void removeDemande(Demande demande) {
        this.demandesFaites.remove(demande);
        demande.setTouriste(null);
    }

    public void addEvaluation(Evaluation evaluation) {
        this.evaluationsFaites.add(evaluation);
        evaluation.setTouriste(this);
    }

    public void removeEvaluation(Evaluation evaluation) {
        this.evaluationsFaites.remove(evaluation);
        evaluation.setTouriste(null);
    }

    // Les méthodes comme annulerDemande, effectuerPaiement, etc., doivent aller dans un service.
}
