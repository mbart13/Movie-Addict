package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.MovieDto;
import com.codecool.moviewatcher.dto.UserDto;
import com.codecool.moviewatcher.dto.UserMapper;
import com.codecool.moviewatcher.exceptions.EntityNotFoundException;
import com.codecool.moviewatcher.service.MovieService;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/users")
public class MoviesController {

    private final MovieService movieService;
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/{userId}/favorites")
    public Set<MovieDto> getFavoriteMovies(@PathVariable Long userId) {
        return movieService.getFavoriteMovies(userId);
    }

    @PostMapping("/{userId}/favorites")
    @ResponseStatus(HttpStatus.CREATED)
    public void addMovieToFavorites(@PathVariable Long userId, @RequestBody MovieDto movieDto) {
        movieService.addToFavorites(userId, movieDto);
    }

    @DeleteMapping("/{user_id}/favorites/{movie_id}")
    public ResponseEntity<MovieDto> removeMovieFromFavorites(@PathVariable("user_id") Long userId, @PathVariable("movie_id") Long movieId) {
        MovieDto movieDto = movieService.removeFromFavorites(userId, movieId);
        return ResponseEntity.ok(movieDto);
    }

    @GetMapping("/{userId}/watchlist")
    public Set<MovieDto> getWatchlistMovies(@PathVariable Long userId) {
        return movieService.getWatchlistMovies(userId);
    }

    @PostMapping("/{userId}/watchlist")
    @ResponseStatus(HttpStatus.CREATED)
    public void addMovieToWatchlist(@PathVariable Long userId, @RequestBody MovieDto movieDto) {
        movieService.addToWatchlist(userId, movieDto);
    }

    @DeleteMapping("/{user_id}/watchlist/{movie_id}")
    public ResponseEntity<MovieDto> removeMovieFromWatchlist(@PathVariable("user_id") Long userId, @PathVariable("movie_id") Long movieId) {
        MovieDto movieDto = movieService.removeFromWatchlist(userId, movieId);
        return ResponseEntity.ok(movieDto);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<UserDto> getUserData(@PathVariable("user_id") Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(userMapper.userToUserDto(user));
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<String> handleNotFoundException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
