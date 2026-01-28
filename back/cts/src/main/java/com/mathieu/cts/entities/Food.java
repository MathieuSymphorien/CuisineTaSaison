package com.mathieu.cts.entities;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import com.mathieu.cts.entities.Months;

import java.util.ArrayList;
import java.util.List;
@Data
@Entity
@Table(name = "foods")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory category;

    @Column
    private String image;   // FEATURE IMAGE POUR PLUS TARD

    @ElementCollection
    @CollectionTable(name = "entite_months", joinColumns = @JoinColumn(name = "entite_id"))
    @Column(name = "month", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<Months> months = new ArrayList<>();

    @Column(nullable = false)
    private Boolean approved = false;

}
