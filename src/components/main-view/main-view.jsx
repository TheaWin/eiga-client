import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
          id: "65773467156ccf84f40fa4b3",
          Name: "Your Name (Kimi no Na wa)",
          Description:
            "A breathtaking story of two strangers connected by a mysterious phenomenon.",
          Genre: {
            Name: "Romance",
            Description: "Heartwarming love stories",
          },
          Director: {
            Name: "Makoto Shinkai",
            Bio: "Renowned for stunning visuals and emotional stories",
            birthYear: 1973,
            deathYear: null,
          },
          releaseYear: 2016,
          imageURL:
            "https://static.wikia.nocookie.net/kiminonawa/images/6/62/Kimi-no-Na-wa.-Visual.jpg/revision/latest?cb=20160927170951",
          Featured: true,
        },
        {
          id: "657734f5156ccf84f40fa4b4",
          Name: "Princess Mononoke",
          Description:
            "The struggle between industrialization and nature, featuring a young warrior and forest spirits.",
          Genre: {
            Name: "Fantasy",
            Description: "Imaginative and magical settings",
          },
          Director: {
            Name: "Hayao Miyazaki",
            Bio: "Legendary animator and director",
            birthYear: 1941,
            deathYear: null,
          },
          releaseYear: 1997,
          imageURL:
            "https://static.wikia.nocookie.net/studio-ghibli/images/c/c6/Princess_Mononoke.jpg/revision/latest/scale-to-width-down/1000?cb=20220409212252",
          Featured: false,
        },
        {
          id: "65773676156ccf84f40fa4b5",
          Name: "Grave of the Fireflies",
          Description:
            "A heartbreaking tale of two siblings trying to survive in war-torn Japan.",
          Genre: {
            Name: "Drama",
            Description: "Emotional and character-driven plots",
          },
          Director: {
            Name: "Isao Takahata",
            Bio: "Co-founder of Studio Ghibli, director, and producer",
            birthYear: 1935,
            deathYear: 2018,
          },
          releaseYear: 1988,
          imageURL:
            "https://static.wikia.nocookie.net/studio-ghibli/images/6/6d/Grave_of_the_Fireflies_poster.jpg/revision/latest/scale-to-width-down/1000?cb=20220126173445",
          Featured: true,
        },
      ]);
    const [selectedMovie, setselectedMovie] = useState(null);

    if (selectedMovie) {
        return (
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setselectedMovie(null)}
          />
        );
      }
      if (movies.length === 0) {
        return <div>The list is empty!</div>;
      }
      return (
        <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setselectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
    );
};