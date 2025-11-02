package com.mathieu.cts.entities;

import javax.persistence.*;

import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private Integer time; // en minutes

    @Column(nullable = false)
    private Boolean oven;

    @Column
    private Integer people;

    @ElementCollection
    @CollectionTable(name = "recipe_steps", joinColumns = @JoinColumn(name = "recipe_id"))
    @OrderColumn(name = "step_order")
    @Column(name = "step")
    private List<String> steps;

    @ManyToMany
    @JoinTable(
        name = "recipe_foods",
        joinColumns = @JoinColumn(name = "recipe_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> foods;

    @Column
    private String image;

    @Column
    private Double seasonRatio;
}
