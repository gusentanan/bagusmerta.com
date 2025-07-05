---

draft: false
title: "Taskk"
description: "To do's app with various features"
image: "./images/taskk/Taskk.jpg"
link: "https://github.com/gusentanan/taskk.git"
tags: [kotlin, github, android]
createdDate: "2023-04-14"
---

### Short explanation

Taskk is a simple to-do app for Android that covers the essentials: Create, Read, Update, and Delete. It also includes task prioritization (easy, medium, hard) to help you focus on what’s most doable first. You can categorize tasks (like study, work, gym, etc.), add notes for extra context or reminders, and set due dates with notifications to keep you on track.

### Goals

I did this project out of frustration with using Notion on my Android device (no shade to Notion—it’s great). My phone just couldn’t handle it smoothly. So, I decided to build my own. I used Kotlin and Jetpack Compose, partly because I was eager to try out the new declarative UI approach in native Android. I originally learned Android development using the imperative XML-based method, which honestly felt pretty exhausting.

### Tech Stack

Taskk is an Android application built using Kotlin. I chose Kotlin because it's the native programming language for Android apps, which means better performance and compatibility on Android devices.

### Features

All in one to-do features

<div className="grid grid-cols-3 items-start gap-4">
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/taskk/refs/heads/main/arts/Home.jpg"
  />
  <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/taskk/main/arts/Detail.jpg"
  />
    <img
    alt="project-image"
    loading="lazy"
    width="800"
    height="426"
    decoding="async"
    src="https://raw.githubusercontent.com/gusentanan/taskk/main/arts/Setting.jpg"
  />
</div>

<br>

### Lesson Learned

I learned a lot while building this app. Aside from switching from XML to Compose for building UI components, there wasn’t much that was entirely new to me—lol. But building UI with Compose is definitely faster than the old way, and there’s less context switching since it’s all written in Kotlin.

For me, there is a few takeaways that we need to follow when building in jetpack compose UI

#### 1. Always provide modifiers
Its basically how we provide a number of interfaces and implementations to attach logic and behaviour to the layouts.
By following this approach, you can maximize the reusability of a UI component and also each component gains flexibility in how it function,
which mean the parent telling the child how the UI is laid out.

```kotlin
@Composable
fun IconLabelButton(
    icon: ImageVector,
    label: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier
            .clickable { onClick() }
            .padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(imageVector = icon, contentDescription = null)
        Spacer(modifier = Modifier.width(4.dp))
        Text(text = label)
    }
}
```

as you can see the code snippet above, by providing modifiers its allow the parrent that going to use the 
`IconLabelButton` to apply layout, styling, gesture modifiers (padding, background, clickable) without modifying the real composeable.
That way, we can easily nest, compose and reuse the component for different context.

#### 2. Discipline in using Slotting pattern

its detailed explained in [**Slot API Pattern**](https://developer.android.com/jetpack/compose/layouts/material#content-slots). Its implements the idea of a component having a single responsibility.

The core idea is:
> A composable should only be responsible for how things are laid out, not what is being shown.

```kotlin
@Composable
fun CardWithHeader(
    header: @Composable () -> Unit,
    content: @Composable () -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(modifier = modifier.padding(16.dp)) {
        header()
        Spacer(modifier = Modifier.height(8.dp))
        content()
    }
}

```

In the example above,  the slotting pattern works by exposing header and content as parameters of type `@Composable () -> Unit`. This means the parent can inject any composable into those slots, giving full control over what the header and content look like—without needing to change the internal layout of `CardWithHeader`.

This approach makes the component highly reusable. You can reuse the same card layout structure for many different use cases just by passing different composables into the slots.

#### But Don’t Overdo It

While the slotting pattern is flexible, adding too many slots to a single component can make it hard to read, maintain, which usually lead to too many open-ended inputs that can cause the component’s behavior unclear.

In my example above, two slots (header and content) are enough and meaningful. 
If you find yourself adding a footer, trailingActions, leadingIcon, etc. all in one go—it’s often better to split the layout into smaller composables.

Dont to it like this.
```kotlin
@Composable
fun NightmareScreen(
    onToggleFavorite: (String) -> Unit,
    onSelectPost: (String) -> Unit, 
    onSearchChange: (String) -> Unit,  
    onThisClick: () -> Unit,  
    onThatClick: () -> Unit,  
    onErrorDismiss: (Long) -> Unit,  
    onRefresh: () -> Unit,  
)

```