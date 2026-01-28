package com.mathieu.cts.entities.DTO;

import java.util.List;

import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodDTO {
    private Long id;
    private String name;
    private FoodCategory category;
    private String image;   // FEATURE IMAGE POUR PLUS TARD
    private List<Months> months;
    private Boolean approved;
}
