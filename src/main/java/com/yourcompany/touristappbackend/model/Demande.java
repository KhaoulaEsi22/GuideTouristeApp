package com.yourcompany.touristappbackend.model;


import com.yourcompany.touristappbackend.Touriste;
import com.yourcompany.touristappbackend.model.Guide;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime; // Pour la date et l'heure de la demande

@Entity
@Table(name = "demandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDateTime dateDemande;
    private String statut; // Ex: "PENDING", "ACCEPTED", "REJECTED", "COMPLETED"

    @ManyToOne(fetch = FetchType.LAZY) // Une demande est faite par un seul touriste
    @JoinColumn(name = "touriste_id", nullable = false) // Clé étrangère vers la table des touristes
    private Touriste touriste; // Le touriste qui fait la demande

    @ManyToOne(fetch = FetchType.LAZY) // Une demande est adressée à un seul guide
    @JoinColumn(name = "guide_id") // Clé étrangère vers la table des guides (nullable si le guide n'est pas encore attribué)
    private Guide guide; // Le guide auquel la demande est adressée (peut être null initialement)

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getDateDemande() {
        return dateDemande;
    }

    public String getStatut() {
        return statut;
    }

    public Touriste getTouriste() {
        return touriste;
    }

    public Guide getGuide() {
        return guide;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDateDemande(LocalDateTime dateDemande) {
        this.dateDemande = dateDemande;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public void setTouriste(Touriste touriste) {
        this.touriste = touriste;
    }

    public void setGuide(Guide guide) {
        this.guide = guide;
    }


}
