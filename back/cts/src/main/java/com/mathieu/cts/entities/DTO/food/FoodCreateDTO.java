package com.mathieu.cts.entities.DTO.food;

import java.util.List;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création d'un Food (POST)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodCreateDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String name;

    @NotNull(message = "La catégorie est obligatoire")
    private FoodCategory category;

    @NotNull(message = "Les mois de saison sont obligatoires")
    @Size(min = 1, message = "Au moins un mois de saison est requis")
    private List<Months> months;
}
