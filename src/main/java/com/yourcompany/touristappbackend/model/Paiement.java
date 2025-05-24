package com.yourcompany.touristappbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "paiements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class Paiement {
    @Id
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
    @Builder.Default
    private UUID id = UUID.randomUUID();

    @NotNull(message = "Le montant est obligatoire")
    @Min(value = 0, message = "Le montant ne peut pas être négatif")
    private Double montant;

    @NotNull(message = "La date de paiement est obligatoire")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date datePaiement = new Date();

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La méthode de paiement est obligatoire")
    private MethodePaiement methodePaiement;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le statut du paiement est obligatoire")
    private StatutPaiement statut = StatutPaiement.EN_ATTENTE; // Statut par défaut

    private String transactionId; // ID de transaction de la passerelle de paiement

    // Relation ManyToOne avec Demande (un paiement est lié à une demande)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demande_id", nullable = false) // Clé étrangère vers l'ID de la demande
    @NotNull(message = "La demande associée au paiement est obligatoire")
    private Demande demande;

    // Méthodes métier (non persistées ici, gérées par le service)
    // traiterPaiement(): Boolean
    // annulerPaiement(): Boolean
}
