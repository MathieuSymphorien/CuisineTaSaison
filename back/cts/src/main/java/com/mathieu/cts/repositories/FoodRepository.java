package com.mathieu.cts.repositories;

import com.mathieu.cts.entities.Food;
import com.mathieu.cts.entities.Months;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("SELECT f FROM Food f WHERE :currentMonth MEMBER OF f.months AND f.category IN ('FRUIT', 'LEGUME') AND f.approved = true")
    List<Food> findSeasonalFruitsAndVegetables(@Param("currentMonth") Months currentMonth);

    Collection<Food> findAll(Specification<Food> spec);

    List<Food> findByApprovedTrue();

    List<Food> findByApprovedFalse();

    boolean existsByNameIgnoreCase(String name);
}
