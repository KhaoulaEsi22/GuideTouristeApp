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

@Builder
@Entity
@Table(name = "paiements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @NotNull(message = "Le montant est obligatoire")
    @Min(value = 0, message = "Le montant ne peut pas être négatif")
    private Double montant;

    @NotNull(message = "La date de paiement est obligatoire")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date datePaiement = new Date();

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La méthode de paiement est obligatoire")
    private Admin.MethodePaiement methodePaiement;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le statut du paiement est obligatoire")
    private StatutDemande.StatutPaiement statut = StatutDemande.StatutPaiement.EN_ATTENTE;

    private String transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demande_id", nullable = false)
    @NotNull(message = "La demande associée au paiement est obligatoire")
    private Demande demande;
}
