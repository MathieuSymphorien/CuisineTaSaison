package com.mathieu.cts.services;

import java.util.List;

import javax.inject.Inject;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.mathieu.cts.entities.DTO.RecipeDTO;
import com.mathieu.cts.repositories.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {
    @Inject 
    private final ModelMapper modelMapper;
    @Inject 
    private final RecipeRepository recipeRepository;
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream()
                .map(recipe -> modelMapper.map(recipe, RecipeDTO.class))
                .toList();
    }
}
