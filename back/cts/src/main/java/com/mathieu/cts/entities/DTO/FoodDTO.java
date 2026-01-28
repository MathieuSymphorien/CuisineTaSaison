package com.mathieu.cts.entities.DTO;

import java.util.List;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodDTO {
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String name;

    @NotNull(message = "La catégorie est obligatoire")
    private FoodCategory category;

    private String image;   // FEATURE IMAGE POUR PLUS TARD

    @NotNull(message = "Les mois de saison sont obligatoires")
    @Size(min = 1, message = "Au moins un mois de saison est requis")
    private List<Months> months;

    private Boolean approved;
}
