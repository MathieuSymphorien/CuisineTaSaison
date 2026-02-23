package com.mathieu.cts.entities.DTO.recipe;

import com.mathieu.cts.entities.Units;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeFoodDTO {

    private Long foodId;
    private Double quantity;
    private Units unit;
}
