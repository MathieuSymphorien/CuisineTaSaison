package com.mathieu.cts.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.mathieu.cts.entities.Food;
import com.mathieu.cts.entities.Recipe;
import com.mathieu.cts.entities.DTO.food.FoodResponseDTO;
import com.mathieu.cts.entities.DTO.recipe.RecipeCreateDTO;
import com.mathieu.cts.entities.DTO.recipe.RecipeResponseDTO;
import com.mathieu.cts.entities.DTO.recipe.RecipeUpdateDTO;
import com.mathieu.cts.exceptions.FoodNotFoundException;
import com.mathieu.cts.exceptions.RecipeNotFoundException;
import com.mathieu.cts.repositories.FoodRepository;
import com.mathieu.cts.repositories.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final ModelMapper modelMapper;
    private final RecipeRepository recipeRepository;
    private final FoodRepository foodRepository;

    public List<RecipeResponseDTO> getAllRecipes() {
        return recipeRepository.findByApprovedTrue().stream()
            .map(this::toResponseDTO)
            .toList();
    }

    public RecipeResponseDTO getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));
        return toResponseDTO(recipe);
    }

    public RecipeResponseDTO createRecipe(RecipeCreateDTO createDTO) {
        Recipe recipe = new Recipe();
        recipe.setName(createDTO.getName());
        recipe.setDescription(createDTO.getDescription());
        recipe.setTime(createDTO.getTime());
        recipe.setOven(createDTO.getOven());
        recipe.setPeople(createDTO.getPeople());
        recipe.setSteps(createDTO.getSteps());
        recipe.setFoods(findFoodsByIds(createDTO.getFoodIds()));
        recipe.setApproved(false);

        Recipe savedRecipe = recipeRepository.save(recipe);
        return toResponseDTO(savedRecipe);
    }

    public RecipeResponseDTO updateRecipe(Long id, RecipeUpdateDTO updateDTO) {
        Recipe existingRecipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));

        // Mise à jour partielle : seuls les champs non-null sont mis à jour
        if (updateDTO.getName() != null) {
            existingRecipe.setName(updateDTO.getName());
        }
        if (updateDTO.getDescription() != null) {
            existingRecipe.setDescription(updateDTO.getDescription());
        }
        if (updateDTO.getTime() != null) {
            existingRecipe.setTime(updateDTO.getTime());
        }
        if (updateDTO.getOven() != null) {
            existingRecipe.setOven(updateDTO.getOven());
        }
        if (updateDTO.getPeople() != null) {
            existingRecipe.setPeople(updateDTO.getPeople());
        }
        if (updateDTO.getSteps() != null) {
            existingRecipe.setSteps(updateDTO.getSteps());
        }
        if (updateDTO.getFoodIds() != null) {
            existingRecipe.setFoods(findFoodsByIds(updateDTO.getFoodIds()));
        }

        Recipe updatedRecipe = recipeRepository.save(existingRecipe);
        return toResponseDTO(updatedRecipe);
    }

    public void deleteRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new RecipeNotFoundException(id);
        }
        recipeRepository.deleteById(id);
    }

    // ===== Méthodes Admin =====

    public List<RecipeResponseDTO> getPendingRecipes() {
        return recipeRepository.findByApprovedFalse().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public RecipeResponseDTO approveRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));
        recipe.setApproved(true);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return toResponseDTO(savedRecipe);
    }

    public void rejectRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new RecipeNotFoundException(id);
        }
        recipeRepository.deleteById(id);
    }

    // ===== Méthodes utilitaires =====

    private List<Food> findFoodsByIds(List<Long> foodIds) {
        return foodIds.stream()
            .map(foodId -> foodRepository.findById(foodId)
                .orElseThrow(() -> new FoodNotFoundException(foodId)))
            .collect(Collectors.toList());
    }

    private RecipeResponseDTO toResponseDTO(Recipe recipe) {
        RecipeResponseDTO dto = new RecipeResponseDTO();
        dto.setId(recipe.getId());
        dto.setName(recipe.getName());
        dto.setDescription(recipe.getDescription());
        dto.setTime(recipe.getTime());
        dto.setOven(recipe.getOven());
        dto.setPeople(recipe.getPeople());
        dto.setSteps(recipe.getSteps());
        dto.setImage(recipe.getImage());
        dto.setSeasonRatio(recipe.getSeasonRatio());
        dto.setApproved(recipe.getApproved());

        // Convertir les foods en FoodResponseDTO
        if (recipe.getFoods() != null) {
            List<FoodResponseDTO> foodDTOs = recipe.getFoods().stream()
                .map(food -> modelMapper.map(food, FoodResponseDTO.class))
                .collect(Collectors.toList());
            dto.setFoods(foodDTOs);
        }

        return dto;
    }
}
