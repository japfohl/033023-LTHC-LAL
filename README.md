# 03232023 Lunch & Learn - Intro to Single Page Applications (SPAs)

## Overview

The intent of this Lunch & Learn is to give you a _very basic_ understanding of what SPAs are, what problems they're trying to solve, and a general metal model of how they work.  We will be focusing on building a single route (one single page with no links or navigation) To-Do app and will cover some basics like:

* Component based design.
* Intra-component communication.
* Handling forms and input.
* Content projection.
* Conditional rendering / styling.
* Basics of templating.
* Implementing behavior.

As we examine these topics, we will focus on three main paradigms / frameworks:

* Vanilla JS
* [React](https://react.dev)
* [Angular](https://angular.io/)

**Things we will not cover:**
* This course will not be a course on the ins and outs of styling and as such, we'll leverage the [Pico CSS](https://picocss.com/) framework to keep the look and feel consistent.
* I'm assuming a basic understanding of modern (ES5 or greater) javascript so I won't be covering things like ES Modules and some of the extra syntax available in more modern versions of JS. 
* We will be using TypeScript for both the Angular and React apps but we won't be covering any of the extra syntax it provides other that for a few things. 

## Structure

The L&L will be broken down into 2 sections.
1. A brief overview of SPAs: _What, why, how, etc..._
2. Implementing a simple SPA using the three above paradigms / frameworks.

As we dive into implementing the app, we'll work in a series of Git branches that will build on each other, starting with the branch `step-0`.  After each step is complete, we'll jump to the next step (`step-n`) until the example app is complete.

## Example App Requirements

1. App should display a list of TODOs
2. The user should be able to enter a new TODO, press enter, and have it added to the end of the list as Active.
3. App should allow the user to toggle the status of a TODO (done / undone).
4. App Should allow the user to delete a TODO from the list.
5. App should allow the user to select their "view" of the TODOs:
    - View All: Display all TODOs. (default view).
    - Incomplete Only: Only show incomplete TODOs
    - Completed Only: Only show completed TODOs.

### Example TODO item

```JavaScript

// all fields are required
const todo = {
    id: 'b851c940-cc3c-42de-8bd2-8ac63e0bef24'  // string
    description: "Buy milk",                    // string
    done: false,                                // boolean
}

```

## Steps

##  `step-0` - Scaffold

In this step we scaffolded the three versions of the app.
1. Vanilla App - Copied static template and created separate CSS and JS files for styles and behavior.  Add script reference for JS file at bottom of body.
2. React App:
   - Scaffolded brand new app using create react app.
   - Got rid of all react boilerplate styles, layout, and example app.
   - Replace return value of app with the static app.
   - Import Pico CSS in index.
   - Replace all `class` attributes with `className` per React standards.
3. Angular App:
   - Scaffold brand new Angular app using angular CLI.
   - Convert module based app to standalone app.
   - Import html into app component template.
   - Add script reference to Pico to index head tag.

## `step-1` - Display Todo List

To begin with we'll dynamically render a static list of TODOs in each app.

For both the Angular and the React apps, this means creating two new components:
1. Todo List Component
    - Takes in a list of Todos and renders then in a list.
    - Rendering of the actual Todo item itself is handled by the Todo Item Component.
2. Todo Item Component
    - Takes in a Todo item and renders the todo itself on the screen. 
    - Dynamically sets the checkbox "checked" property and the "completed" styling on the text.

In the vanilla version of the application, we have to fully remove the markup from the page and re-build it from scratch using the standard DOM API.  We then clear the view, and re-render using the newly generated list.

One notable difference about the Angular applicaiton is the use of an injectable service.  The Angular style of doing this is to encapsulate logic wherever possible and so, moving behavior to the `TodoService` makes a great deal of sense.  Under normal circumstances I'd be inclined to leverage some reactive programming techniques but for this demo we'll strive for simplicity and clarity.

### Vanilla

### React

### Angular

## Resources

* https://developer.mozilla.org/en-US/
* https://devdocs.io/