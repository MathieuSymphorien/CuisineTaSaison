package com.mathieu.cts.services;

import com.mathieu.cts.entities.DTO.food.FoodCreateDTO;
import com.mathieu.cts.entities.DTO.food.FoodResponseDTO;
import com.mathieu.cts.entities.Food;
import com.mathieu.cts.entities.FoodCategory;
import com.mathieu.cts.entities.Months;
import com.mathieu.cts.exceptions.FoodAlreadyExistsException;
import com.mathieu.cts.exceptions.FoodNotFoundException;
import com.mathieu.cts.repositories.FoodRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires pour FoodService.
 *
 * Un test unitaire vérifie qu'une méthode fait ce qu'elle doit faire,
 * en isolation (on "simule" la base de données avec Mockito).
 *
 * Structure d'un test : Arrange → Act → Assert
 *   1. Arrange : on prépare les données et les comportements simulés
 *   2. Act     : on appelle la méthode qu'on teste
 *   3. Assert  : on vérifie que le résultat est correct
 */
@ExtendWith(MockitoExtension.class)
class FoodServiceTest {

    // @Mock crée une fausse version du repository (pas de vraie base de données)
    @Mock
    private FoodRepository foodRepository;

    @Mock
    private ModelMapper modelMapper;

    // @InjectMocks crée le service et lui injecte les mocks ci-dessus
    @InjectMocks
    private FoodService foodService;

    // Données de test réutilisables
    private Food pomme;
    private FoodResponseDTO pommeDTO;

    @BeforeEach
    void setUp() {
        // Avant chaque test, on prépare un aliment de test
        pomme = new Food();
        pomme.setId(1L);
        pomme.setName("Pomme");
        pomme.setCategory(FoodCategory.FRUIT);
        pomme.setMonths(List.of(Months.SEPTEMBRE, Months.OCTOBRE, Months.NOVEMBRE));
        pomme.setApproved(true);

        pommeDTO = new FoodResponseDTO(1L, "Pomme", FoodCategory.FRUIT, null,
                List.of(Months.SEPTEMBRE, Months.OCTOBRE, Months.NOVEMBRE), true);
    }

    // ==================== createFood ====================

    @Test
    @DisplayName("Créer un aliment avec succès")
    void createFood_success() {
        // Arrange : on prépare le DTO d'entrée et on simule le comportement du repo
        FoodCreateDTO createDTO = new FoodCreateDTO("Pomme", FoodCategory.FRUIT,
                List.of(Months.SEPTEMBRE, Months.OCTOBRE));

        when(foodRepository.existsByNameIgnoreCase("Pomme")).thenReturn(false);
        when(foodRepository.save(any(Food.class))).thenReturn(pomme);
        when(modelMapper.map(any(Food.class), eq(FoodResponseDTO.class))).thenReturn(pommeDTO);

        // Act : on appelle la méthode
        FoodResponseDTO result = foodService.createFood(createDTO);

        // Assert : on vérifie le résultat
        assertNotNull(result);
        assertEquals("Pomme", result.getName());
        assertEquals(FoodCategory.FRUIT, result.getCategory());

        // On vérifie que save() a bien été appelé une fois
        verify(foodRepository, times(1)).save(any(Food.class));
    }

    @Test
    @DisplayName("Créer un aliment qui existe déjà → exception")
    void createFood_alreadyExists_throwsException() {
        // Arrange : on simule qu'un aliment avec ce nom existe déjà
        FoodCreateDTO createDTO = new FoodCreateDTO("Pomme", FoodCategory.FRUIT,
                List.of(Months.SEPTEMBRE));

        when(foodRepository.existsByNameIgnoreCase("Pomme")).thenReturn(true);

        // Act + Assert : on vérifie que l'exception est bien lancée
        assertThrows(FoodAlreadyExistsException.class, () -> {
            foodService.createFood(createDTO);
        });

        // On vérifie que save() n'a PAS été appelé
        verify(foodRepository, never()).save(any());
    }

    // ==================== getFoodById ====================

    @Test
    @DisplayName("Trouver un aliment par son ID")
    void getFoodById_found() {
        // Arrange
        when(foodRepository.findById(1L)).thenReturn(Optional.of(pomme));
        when(modelMapper.map(pomme, FoodResponseDTO.class)).thenReturn(pommeDTO);

        // Act
        FoodResponseDTO result = foodService.getFoodById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Pomme", result.getName());
    }

    @Test
    @DisplayName("Chercher un aliment qui n'existe pas → exception")
    void getFoodById_notFound_throwsException() {
        // Arrange : le repo retourne "vide"
        when(foodRepository.findById(999L)).thenReturn(Optional.empty());

        // Act + Assert
        assertThrows(FoodNotFoundException.class, () -> {
            foodService.getFoodById(999L);
        });
    }

    // ==================== deleteFood ====================

    @Test
    @DisplayName("Supprimer un aliment existant")
    void deleteFood_success() {
        when(foodRepository.existsById(1L)).thenReturn(true);

        // Pas d'exception = succès
        assertDoesNotThrow(() -> foodService.deleteFood(1L));
        verify(foodRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Supprimer un aliment qui n'existe pas → exception")
    void deleteFood_notFound_throwsException() {
        when(foodRepository.existsById(999L)).thenReturn(false);

        assertThrows(FoodNotFoundException.class, () -> {
            foodService.deleteFood(999L);
        });
    }

    // ==================== approveFood ====================

    @Test
    @DisplayName("Approuver un aliment met approved à true")
    void approveFood_success() {
        Food unapproved = new Food();
        unapproved.setId(2L);
        unapproved.setName("Carotte");
        unapproved.setCategory(FoodCategory.LEGUME);
        unapproved.setMonths(List.of(Months.JANVIER));
        unapproved.setApproved(false);

        FoodResponseDTO approvedDTO = new FoodResponseDTO(2L, "Carotte", FoodCategory.LEGUME,
                null, List.of(Months.JANVIER), true);

        when(foodRepository.findById(2L)).thenReturn(Optional.of(unapproved));
        when(foodRepository.save(any(Food.class))).thenReturn(unapproved);
        when(modelMapper.map(any(Food.class), eq(FoodResponseDTO.class))).thenReturn(approvedDTO);

        FoodResponseDTO result = foodService.approveFood(2L);

        // Après approbation, approved doit être true
        assertTrue(unapproved.getApproved());
        verify(foodRepository).save(unapproved);
    }
}
