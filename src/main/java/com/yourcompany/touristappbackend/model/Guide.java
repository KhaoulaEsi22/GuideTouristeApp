package com.yourcompany.touristappbackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "guides")
@Data
@NoArgsConstructor
@AllArgsConstructor // Si vous avez un constructeur avec tous les champs
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class Guide extends User {

    private String bio;
    private String languesParlees;
    private double tarifParHeure;

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Evaluation> evaluations = new HashSet<>(); // Ceci devrait résoudre l'erreur ligne 29

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Demande> demandesRecues = new HashSet<>(); // Ceci devrait résoudre l'erreur ligne 32

    public void addEvaluation(Evaluation evaluation) {
        this.evaluations.add(evaluation);
        evaluation.setGuide(this);
    }

    public void removeEvaluation(Evaluation evaluation) {
        this.evaluations.remove(evaluation);
        evaluation.setGuide(null);
    }

    public void addDemande(Demande demande) {
        this.demandesRecues.add(demande);
        demande.setGuide(this);
    }

    public void removeDemande(Demande demande) {
        this.demandesRecues.remove(demande);
        demande.setGuide(null);
    }
}
