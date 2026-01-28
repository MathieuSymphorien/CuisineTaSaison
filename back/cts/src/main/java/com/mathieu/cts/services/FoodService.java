package com.mathieu.cts.services;

import com.mathieu.cts.entities.DTO.food.FoodCreateDTO;
import com.mathieu.cts.entities.DTO.food.FoodResponseDTO;
import com.mathieu.cts.entities.DTO.food.FoodUpdateDTO;
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

    public List<FoodResponseDTO> getAllFoods(String name, FoodCategory category, List<Months> months) {
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
            .map(this::toResponseDTO)
            .collect(Collectors.toList());
    }

    public List<FoodResponseDTO> getSeasonalFruitsAndVegetables() {
        Months currentMonth = Months.values()[java.time.LocalDate.now().getMonthValue() - 1];
        return foodRepository.findSeasonalFruitsAndVegetables(currentMonth)
            .stream()
            .map(this::toResponseDTO)
            .collect(Collectors.toList());
    }

    public FoodResponseDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
            .orElseThrow(() -> new FoodNotFoundException(id));
        return toResponseDTO(food);
    }

    public FoodResponseDTO createFood(FoodCreateDTO createDTO) {
        Food food = new Food();
        food.setName(createDTO.getName());
        food.setCategory(createDTO.getCategory());
        food.setMonths(createDTO.getMonths());
        food.setApproved(false);

        Food savedFood = foodRepository.save(food);
        return toResponseDTO(savedFood);
    }

    public FoodResponseDTO updateFood(Long id, FoodUpdateDTO updateDTO) {
        Food existingFood = foodRepository.findById(id)
            .orElseThrow(() -> new FoodNotFoundException(id));

        // Mise à jour partielle : seuls les champs non-null sont mis à jour
        if (updateDTO.getName() != null) {
            existingFood.setName(updateDTO.getName());
        }
        if (updateDTO.getCategory() != null) {
            existingFood.setCategory(updateDTO.getCategory());
        }
        if (updateDTO.getMonths() != null) {
            existingFood.setMonths(updateDTO.getMonths());
        }

        Food updatedFood = foodRepository.save(existingFood);
        return toResponseDTO(updatedFood);
    }

    public void deleteFood(Long id) {
        if (!foodRepository.existsById(id)) {
            throw new FoodNotFoundException(id);
        }
        foodRepository.deleteById(id);
    }

    // ===== Méthodes Admin =====

    public List<FoodResponseDTO> getPendingFoods() {
        return foodRepository.findByApprovedFalse().stream()
            .map(this::toResponseDTO)
            .collect(Collectors.toList());
    }

    public FoodResponseDTO approveFood(Long id) {
        Food food = foodRepository.findById(id)
            .orElseThrow(() -> new FoodNotFoundException(id));
        food.setApproved(true);
        Food savedFood = foodRepository.save(food);
        return toResponseDTO(savedFood);
    }

    public void rejectFood(Long id) {
        if (!foodRepository.existsById(id)) {
            throw new FoodNotFoundException(id);
        }
        foodRepository.deleteById(id);
    }

    // ===== Méthode utilitaire =====

    private FoodResponseDTO toResponseDTO(Food food) {
        return modelMapper.map(food, FoodResponseDTO.class);
    }
}
