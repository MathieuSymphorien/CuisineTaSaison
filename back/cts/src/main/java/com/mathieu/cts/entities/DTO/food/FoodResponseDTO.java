package com.mathieu.cts.entities.DTO.food;

import java.util.List;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour les réponses (GET, retour de POST/PUT)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponseDTO {
    private Long id;
    private String name;
    private FoodCategory category;
    private String image;
    private List<Months> months;
    private Boolean approved;
}
