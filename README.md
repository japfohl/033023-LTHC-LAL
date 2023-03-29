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

## `step-1` - Add Todo

This step enables the user to add todos to the list.

### Angular

1. Created the `app-todo-form` component to encapsulate the logic of the input field and any validation requirements.
   - Internally we're using a `FormControl` class from the `ReactiveFormsModule`.  This allows us to define all the business logic around the validation and behavior at the class level and keeps the template relativesly simple.
   - The `FormControl` defines a form field that can't be null and is required. That field is bound to the input in the template.  Any time the form is submitted (which would happen by the user pressing enter), the `onSubmit` logic runs.  As long as the input field is valid (as defined by the validator functions on the form control), we emit the event and reset the field value. If the field isn't valid, we force validation to occur.
   - In the case that the user doesn't submit, but we still want to show an error message before they press enter, we're relying on the `FormControl`'s invalid (the value doesn't conform to any of the validator functions passed to the control) and dirty (the value has been changed by the user) statuses.
2. Updated the `app-root` component to handle the `addTodo` event.  The component accepts the emitted description and calls the (newly added) `addTodo` method on the `TodoService`.

### React

1. Created `TodoForm` component to encapsulate the logic of the input field and validation requirements.
   - A native html `<form>` is being used to render the view here.  Built in validation attributes (`required`) are used to prevent invalid input.
   - The actual value of the form is being kept in sync with a local state variable using the `useState` hook (provided by React).  Any time the value changes, we update the state value using the `setDescription` function and that value is then bound to the `value` property on the `input` element.
   - When the user submits, we call the passed in `onSave` function with the value and reset the description to an empty string value using the hook's provided `setDescription` function.
   - `useState` is a function that takes an initial state, and returns an array where the first index is the current state value (automatically updated between renders) and the second value is a setter function for that value.
 - In the `App` component, we're passing the `addTodo` function into the `TodoForm`'s `onSave` prop.  That function get's called by the `TodoForm` and internally, take that value, create a new array with the current state value, appending the current result to the end of the array.

### Vanilla

The vanilla implementation is handled by the addition of the `initTodoForm` function in the `js` file.  This function does the following:
- Stops the normal submit event and extracts the form input value.
- Adds a new value to the global array.
- rerenders the whole list
- resets the input value

A note on performance: One big disadvantage of the vanilla implementation is it is considerable less performant as the size of the list grows.  The vanilla implementation clears the list and re-renders the whole thing every time the value changes.  The react implementation (via the key prop) and the angular implementation (via the track by function) ensure that only the changed nodes are added or updated.

## Resources

* https://developer.mozilla.org/en-US/
* https://devdocs.io/