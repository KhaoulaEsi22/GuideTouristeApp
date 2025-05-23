package com.yourcompany.touristappbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "guides") // Table spécifique pour les guides
@Data
@NoArgsConstructor
@SuperBuilder // Permet de construire des instances de Guide avec @Builder
public class Guide extends User { // Guide hérite du modèle User

    // Attributs spécifiques au Guide
    private String bio; // Courte biographie
    private String languesParlees; // Ex: "Français, Anglais, Arabe"
    private double tarifParHeure; // Tarif de prestation
    // ... d'autres attributs comme disponibilité, notes moyennes, etc.

    // Relations One-to-Many
    // Un guide peut avoir plusieurs évaluations
    // mappedBy = "guide" indique que le champ 'guide' dans la classe Evaluation gère la relation.
    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Evaluation> evaluations = new HashSet<>(); // Correct pour la ligne 29 (environ)

    // Un guide peut recevoir plusieurs demandes
    // mappedBy = "guide" indique que le champ 'guide' dans la classe Demande gère la relation.
    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Demande> demandesRecues = new HashSet<>(); // Correct pour la ligne 32 (environ)

    public Guide(UUID id, String email, String motDePasse, String nom, String prenom, String telephone, Date dateCreation, Boolean estActif, Role role, String bio, String languesParlees, double tarifParHeure, Set<Evaluation> evaluations, Set<Demande> demandesRecues) {
        super(id, email, motDePasse, nom, prenom, telephone, dateCreation, estActif, role);
        this.bio = bio;
        this.languesParlees = languesParlees;
        this.tarifParHeure = tarifParHeure;
        this.evaluations = evaluations;
        this.demandesRecues = demandesRecues;
    }

    // Constructeurs, Getters, Setters (Lombok s'en charge)

    // Méthodes utilitaires pour ajouter/supprimer des relations (bonne pratique)
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

    public String getBio() {
        return bio;
    }

    public String getLanguesParlees() {
        return languesParlees;
    }

    public double getTarifParHeure() {
        return tarifParHeure;
    }

    public Set<Evaluation> getEvaluations() {
        return evaluations;
    }

    public Set<Demande> getDemandesRecues() {
        return demandesRecues;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setLanguesParlees(String languesParlees) {
        this.languesParlees = languesParlees;
    }

    public void setTarifParHeure(double tarifParHeure) {
        this.tarifParHeure = tarifParHeure;
    }

    public void setEvaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public void setDemandesRecues(Set<Demande> demandesRecues) {
        this.demandesRecues = demandesRecues;
    }
}
