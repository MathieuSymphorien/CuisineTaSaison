package com.mathieu.cts.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.mathieu.cts.entities.Recipe;
import com.mathieu.cts.entities.DTO.RecipeDTO;
import com.mathieu.cts.exceptions.RecipeNotFoundException;
import com.mathieu.cts.repositories.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {
    
    private final ModelMapper modelMapper;
    private final RecipeRepository recipeRepository;
    
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findByApprovedTrue().stream()
            .map(recipe -> modelMapper.map(recipe, RecipeDTO.class))
            .toList();
    }
    
    public RecipeDTO getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));
        return modelMapper.map(recipe, RecipeDTO.class);
    }
    
    public RecipeDTO createRecipe(RecipeDTO recipeDTO) {
        Recipe recipe = modelMapper.map(recipeDTO, Recipe.class);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return modelMapper.map(savedRecipe, RecipeDTO.class);
    }
    
    public RecipeDTO updateRecipe(Long id, RecipeDTO recipeDTO) {
        Recipe existingRecipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));

        existingRecipe.setName(recipeDTO.getName());
        existingRecipe.setDescription(recipeDTO.getDescription());
        existingRecipe.setTime(recipeDTO.getTime());
        existingRecipe.setOven(recipeDTO.getOven());
        existingRecipe.setPeople(recipeDTO.getPeople());
        existingRecipe.setSteps(recipeDTO.getSteps());
        existingRecipe.setFoods(recipeDTO.getFoods());
        existingRecipe.setImage(recipeDTO.getImage());
        existingRecipe.setSeasonRatio(recipeDTO.getSeasonRatio());

        Recipe updatedRecipe = recipeRepository.save(existingRecipe);
        return modelMapper.map(updatedRecipe, RecipeDTO.class);
    }
    
    public void deleteRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new RecipeNotFoundException(id);
        }
        recipeRepository.deleteById(id);
    }

    // ===== Méthodes Admin =====

    public List<RecipeDTO> getPendingRecipes() {
        return recipeRepository.findByApprovedFalse().stream()
                .map(recipe -> modelMapper.map(recipe, RecipeDTO.class))
                .toList();
    }

    public RecipeDTO approveRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RecipeNotFoundException(id));
        recipe.setApproved(true);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return modelMapper.map(savedRecipe, RecipeDTO.class);
    }

    public void rejectRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new RecipeNotFoundException(id);
        }
        recipeRepository.deleteById(id);
    }
}
