package com.mathieu.cts.services;

import com.mathieu.cts.entities.DTO.FoodDTO;
import com.mathieu.cts.entities.Food;
import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;
import com.mathieu.cts.exceptions.FoodNotFoundException;
import com.mathieu.cts.repositories.FoodRepository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final ModelMapper modelMapper;

    public List<FoodDTO> getAllFoods(String name, FoodCategory category, List<Months> months) {
        Specification<Food> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(criteriaBuilder.equal(root.get("approved"), true));

            if (months != null && !months.isEmpty()) {
                Join<Food, Months> joinMonths = root.join("months");
                predicates.add(joinMonths.in(months));
            }

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")),
                    "%" + name.toLowerCase() + "%"
                ));
            }

            if (category != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return foodRepository.findAll(spec).stream()
            .map(food -> modelMapper.map(food, FoodDTO.class))
            .collect(Collectors.toList());
    }

    //Récupère les foods de saison
    public List<FoodDTO> getSeasonalFruitsAndVegetables() {
        Months currentMonth = Months.values()[java.time.LocalDate.now().getMonthValue() - 1];
        return foodRepository.findSeasonalFruitsAndVegetables(currentMonth)
            .stream()
            .map(food -> modelMapper.map(food, FoodDTO.class))
            .collect(Collectors.toList());
}

    public FoodDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
            .orElseThrow(() -> new FoodNotFoundException(id));
        return modelMapper.map(food, FoodDTO.class);
    }

    public FoodDTO createFood(FoodDTO foodDTO) {
        Food food = modelMapper.map(foodDTO, Food.class);
        Food savedFood = foodRepository.save(food);
        return modelMapper.map(savedFood, FoodDTO.class);
    }

    public FoodDTO updateFood(Long id, FoodDTO foodDTO) {
        Food existingFood = foodRepository.findById(id)
            .orElseThrow(() -> new FoodNotFoundException(id));

        existingFood.setName(foodDTO.getName());

        Food updatedFood = foodRepository.save(existingFood);
        return modelMapper.map(updatedFood, FoodDTO.class);
    }

    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }

    // ===== Méthodes Admin =====

    public List<FoodDTO> getPendingFoods() {
        return foodRepository.findByApprovedFalse().stream()
            .map(food -> modelMapper.map(food, FoodDTO.class))
            .collect(Collectors.toList());
    }

    public FoodDTO approveFood(Long id) {
        Food food = foodRepository.findById(id)
            .orElseThrow(() -> new FoodNotFoundException(id));
        food.setApproved(true);
        Food savedFood = foodRepository.save(food);
        return modelMapper.map(savedFood, FoodDTO.class);
    }

    public void rejectFood(Long id) {
        if (!foodRepository.existsById(id)) {
            throw new FoodNotFoundException(id);
        }
        foodRepository.deleteById(id);
    }
}