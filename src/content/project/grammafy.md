---
draft: false
title: "Grammafy"
description: "Grammar correction chat app using Generative AI"
image: "./images/grammafy/grammafy.png"
link: "https://github.com/gusentanan/grammafy.git"
tags: [flutter, github]
createdDate: "2025-02-01"
---

### Short Explanation

Grammafy is a Flutter mobile application that provides instant grammar correction using Google Gemini AI. The app eliminates the need to copy-paste text to external AI services by offering one-tap grammar correction with intelligent tone selection. Built with clean architecture principles, it features a chat-like interface where users can input text, select correction styles (Formal, Neutral, or Friendly), and instantly receive corrected grammar with the ability to copy results to clipboard.

### Goals

This app was born from my personal frustration of constantly using ChatGPT to correct grammar in my messages when working with international colleagues. The repetitive process of copy-pasting text and sifting through AI responses was inefficient. I wanted a dedicated, privacy-first solution that could correct grammar instantly without leaving the app or compromising user data.

<div className="grid grid-cols-2 items-start gap-4">
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/grammafy/refs/heads/main/assets/images/initial.JPEG"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/grammafy/refs/heads/main/assets/images/neutral.JPEG"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/grammafy/refs/heads/main/assets/images/formal.JPEG"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/grammafy/refs/heads/main/assets/images/friendly.JPEG"
  />
</div>

<br>

### Technical Details

Grammafy is built using Dart and the Flutter framework, which enables cross-platform development for both Android and iOS devices. The application follows Clean Architecture principles with a clear separation between Domain, Data, and Presentation layers, making the codebase more maintainable and testable.

For state management, the app uses BLoC/Cubit with flutter_bloc, providing a reactive and predictable way to manage application state. The AI functionality is powered by Google Gemini GenAI API, which handles the core grammar correction capabilities with different tone adjustments.

The project includes a comprehensive test suite covering unit, widget, and integration tests to ensure reliability and code quality across all layers of the application.

### Key Features

The app features intelligent tone selection, allowing users to choose from Formal (business-appropriate), Neutral (balanced), or Friendly (conversational) correction styles depending on their communication context. The smart input interface automatically detects clipboard content when the field is empty and provides a seamless send experience when filled.

Users enjoy a chat-like experience with conversation-style UI and typing animations that make grammar correction feel natural and engaging. The instant copy function enables one-tap copying of corrected text to clipboard, streamlining the workflow for immediate use in other applications.

Privacy is a core focus with a privacy-first design that ensures no data logging and uses the user's own API credentials. The app also allows users to refresh responses and generate new corrections with different tones, providing flexibility in communication style. The robust testing foundation includes 26+ unit tests with high coverage across Repository and NetworkDataSource layers.

### Technical Lessons Learned

Building Grammafy provided valuable insights into Flutter development and software architecture patterns. Implementing Clean Architecture with Flutter taught me the importance of proper separation of concerns, where the three-layer approach (Domain → Data → Presentation) made the codebase significantly more testable and maintainable. Using dependency injection with get_it and injectable created a loosely coupled system where business logic remained independent of framework-specific details.

Working with flutter_bloc and Freezed unions provided type-safe state management that proved invaluable for complex UI flows. The pattern of state.when() for handling different states (initial, loading, success, failure) while maintaining tone selection across all states demonstrated the power of immutable state management in creating predictable user experiences.

The integration of functional programming concepts through fpdart's Either monad for error handling was particularly enlightening. This approach eliminated the need for try-catch blocks throughout the presentation layer, making error handling more predictable and maintainable. The result.fold() pattern for handling success/failure cases created cleaner, more readable code.

Developing a comprehensive testing strategy taught me the value of different testing approaches at various levels. Creating 26+ comprehensive unit tests covering Repository and NetworkDataSource layers using Mockito for API mocking achieved high test coverage by testing both success and failure scenarios, ensuring reliable business logic validation.

The implementation of end-to-end testing using the Patrol framework provided superior UI testing capabilities compared to traditional Flutter integration tests. Patrol's ability to interact with native platform features like clipboard access and handle complex user flows made testing the complete grammar correction workflow seamless, giving confidence in the app's reliability across different user scenarios.
