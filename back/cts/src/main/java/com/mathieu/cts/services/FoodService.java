package com.mathieu.cts.services;

import com.mathieu.cts.entities.DTO.FoodDTO;
import com.mathieu.cts.entities.Food;
import com.mathieu.cts.repositories.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final ModelMapper modelMapper;

    // Récupère tous les foods
    public List<FoodDTO> getAllFoods() {
        return foodRepository.findAll()
                .stream()
                .map(food -> modelMapper.map(food, FoodDTO.class))
                .collect(Collectors.toList());
    }

    // Récupère un food par son ID
    public FoodDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
        return modelMapper.map(food, FoodDTO.class);
    }

    // Crée un nouveau food
    public FoodDTO createFood(FoodDTO foodDTO) {
        Food food = modelMapper.map(foodDTO, Food.class);
        Food savedFood = foodRepository.save(food);
        return modelMapper.map(savedFood, FoodDTO.class);
    }

    // Met à jour un food existant
    public FoodDTO updateFood(Long id, FoodDTO foodDTO) {
        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));

        existingFood.setName(foodDTO.getName());
        existingFood.setDescription(foodDTO.getDescription());

        Food updatedFood = foodRepository.save(existingFood);
        return modelMapper.map(updatedFood, FoodDTO.class);
    }

    // Supprime un food par son ID
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}
