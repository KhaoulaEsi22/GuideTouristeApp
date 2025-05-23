package com.yourcompany.touristappbackend;


import com.yourcompany.touristappbackend.model.Demande;
import com.yourcompany.touristappbackend.model.Evaluation;
import com.yourcompany.touristappbackend.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "touristes")
@Data
@NoArgsConstructor
@SuperBuilder
public class Touriste extends User { // Hérite de User

    // Autres attributs spécifiques au touriste si nécessaire
    // Par exemple, une liste de ses réservations futures, préférences, etc.

    @OneToMany(mappedBy = "touriste", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Demande> demandes = new HashSet<>(); // Demandes faites par ce touriste

    @OneToMany(mappedBy = "touriste", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Evaluation> evaluationsDonnees = new HashSet<>(); // Évaluations données par ce touriste

    // Constructeurs, Getters, Setters (Lombok s'en charge)
}
