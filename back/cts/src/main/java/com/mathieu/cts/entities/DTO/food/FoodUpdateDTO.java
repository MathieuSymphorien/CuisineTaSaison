package com.mathieu.cts.entities.DTO.food;

import java.util.List;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la modification d'un Food (PUT)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodUpdateDTO {

    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String name;

    private FoodCategory category;

    @Size(min = 1, message = "Au moins un mois de saison est requis")
    private List<Months> months;
}
