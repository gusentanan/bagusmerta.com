---
draft: false
title: "Moviee"
description: "Movie Browsing platform built using modern Kotlin, emphasizing  Clean Architecture"
image: "./images/moviee/Moviee.jpg"
link: "https://github.com/gusentanan/moviee"
tags: [kotlin, github, android]
createdDate: "2023-02-12"
---

### Short explanation

**Moviee** is a movie browsing platform that features various movie categories, a search function, and the ability to save favorite movies. Detailed movie pages provide comprehensive information about each film, including the plot, cast, reviews, release date, and the option to watch the trailer!

### Goals

The goal of this project is primarily self-learning. After completing a bootcamp on Android development, I learned a lot, but what interested me the most was how to architect a codebase using **MVVM** and clean architecture. However, at that time, I didn’t fully understand the benefits of implementing these patterns in real-world projects. So, I decided to create one—the **Moviee** app.

Overall, I wanted to understand the practical benefits of these design patterns without any external pressure, deadlines, or constraints. This allows for continuous development and helps me see how these approaches help me as a developer.

### Tech Stack

I'm using **Kotlin** for Android development, with the help of various dependencies to enable the app's functionality. You can see the full dependencies used in this app from my Github Repository.

The architecture of this app complies with the following three principles:

- [**Model-View-ViewModel (MVVM)**](https://proandroiddev.com/understanding-mvvm-pattern-for-android-in-2021-98b155b37b54)
    
    By utilizing the **ViewModel**, this architecture achieves a more modular, testable, and maintainable codebase. It improves separation of concerns and establishes a clear distinction between **UI logic** and **business logic/data operations**.
    
- [**Modular App Architecture**](https://developer.android.com/topic/modularization)
    
    Modularization enables the development of features in isolation, independent of other features. This approach provides benefits such as **reusability**, **scalability**, **maintainability**, reduced app size, and easier modification or replacement of specific features.
    
- [**Clean Architecture**](https://proandroiddev.com/kotlin-clean-architecture-1ad42fcd97fa)
    
    Clean Architecture strictly emphasizes a clear separation of concerns through distinct architectural layers: **Presentation/UI Layer**, **Domain Layer**, and **Data Layer**. This separation facilitates writing tests without dependencies on external frameworks or UI components, significantly enhancing testability.

<img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/moviee-arch.png"
  />

> Image above show the dependencies between module

The `:app` module directly depends on `:core`, `:common-ui`, and `:feature`, meaning it cannot function if any of them are missing. It also indirectly depends on `:utility` if required.  

The `:feature` module directly depends on `:core` and `:common-ui` and indirectly depends on `:utility`.  

The `:core` module indirectly depends on `:utility`, whereas `:utility` and `:common-ui` have no dependencies.



### Features
This app offers several features.

1. `Explore Movies` : Browse through various categories and genres to discover movies that interest you.

2. `Detailed Information` : Access comprehensive details about each movie, including cast, release information, budget, and recommendations.

3. `Search Functionality` : Easily find specific movies using the search feature.

4. `Favorites List` : Save movies to your favorites for quick access later.

5. `Watch Trailers` : View trailers to get a glimpse of the movies before watching.

<br>

<div className="grid grid-cols-2 items-start gap-4">
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/main.jpg"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/allmovie.jpg"
  />
</div>


>  Showcases various categories such as Top Rated and Trending movies.

<div className="grid grid-cols-2 items-start gap-4">
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/detail-1.jpg"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/detail-2.jpg"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/trailer.jpg"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/favoritee.jpg"
  />
</div>



> Provides in-depth information about the movie, including cast, release details, budget, trailers, and recommendations. You can also add movies to your favorites list from here

<div className="grid grid-cols-2 items-start gap-4">
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/search-1.jpg"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/moviee/refs/heads/main/arts/search-2.jpg"
  />
</div>


> Utilize the search function to find movies that you like 


### Lesson Learned
I thoroughly enjoyed and learned a lot while developing this app. One thing I realized when trying to implement clean architecture is that it’s challenging to get it right in the first iteration. However, over time, as I added more features, it became much easier. This architecture ensures that each module and layer has its own responsibility and is loosely coupled from other modules. As a result, making changes to an existing feature or adding new ones is seamless, and the development velocity significantly improves.