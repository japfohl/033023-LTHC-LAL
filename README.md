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

###  `step-0` - Scaffold

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

### `step-1` - Display Todo List

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

### `step-2` - Add Todo

This step enables the user to add todos to the list.

#### Angular

1. Created the `app-todo-form` component to encapsulate the logic of the input field and any validation requirements.
   - Internally we're using a `FormControl` class from the `ReactiveFormsModule`.  This allows us to define all the business logic around the validation and behavior at the class level and keeps the template relativesly simple.
   - The `FormControl` defines a form field that can't be null and is required. That field is bound to the input in the template.  Any time the form is submitted (which would happen by the user pressing enter), the `onSubmit` logic runs.  As long as the input field is valid (as defined by the validator functions on the form control), we emit the event and reset the field value. If the field isn't valid, we force validation to occur.
   - In the case that the user doesn't submit, but we still want to show an error message before they press enter, we're relying on the `FormControl`'s invalid (the value doesn't conform to any of the validator functions passed to the control) and dirty (the value has been changed by the user) statuses.
2. Updated the `app-root` component to handle the `addTodo` event.  The component accepts the emitted description and calls the (newly added) `addTodo` method on the `TodoService`.

#### React

1. Created `TodoForm` component to encapsulate the logic of the input field and validation requirements.
   - A native html `<form>` is being used to render the view here.  Built in validation attributes (`required`) are used to prevent invalid input.
   - The actual value of the form is being kept in sync with a local state variable using the `useState` hook (provided by React).  Any time the value changes, we update the state value using the `setDescription` function and that value is then bound to the `value` property on the `input` element.
   - When the user submits, we call the passed in `onSave` function with the value and reset the description to an empty string value using the hook's provided `setDescription` function.
   - `useState` is a function that takes an initial state, and returns an array where the first index is the current state value (automatically updated between renders) and the second value is a setter function for that value.
 - In the `App` component, we're passing the `addTodo` function into the `TodoForm`'s `onSave` prop.  That function get's called by the `TodoForm` and internally, take that value, create a new array with the current state value, appending the current result to the end of the array.

#### Vanilla

The vanilla implementation is handled by the addition of the `initTodoForm` function in the `js` file.  This function does the following:
- Stops the normal submit event and extracts the form input value.
- Adds a new value to the global array.
- rerenders the whole list
- resets the input value

A note on performance: One big disadvantage of the vanilla implementation is it is considerable less performant as the size of the list grows.  The vanilla implementation clears the list and re-renders the whole thing every time the value changes.  The react implementation (via the key prop) and the angular implementation (via the track by function) ensure that only the changed nodes are added or updated.

### `step-3` - Toggle Todo

When the user toggles a given todo, that action needs to be captured and synced with the global state (whatever data is backing the current view).  In every case, that data is an array of todos.  Each implementation below addresses this in a different way.

#### Angular

- To begin with we introduced the `TodoChange` type to handle the data requirements around the toggle action.
- The todo item then added an event emitter named `toggleTodo` that emits the `TodoChange` event.
- The `TodoListComponent` intercepts that event and emits it's own even`toggleTodo` event to the top level component.
- The app component handles that event by calling the newly added `setTodoStatus` method on the `TodoService`

#### React

- The react implementation is strikingly similar to the angular one, except that instead of passing the event back up the component chain, we're passing the event handler down the component tree (a phenomenon that is known as "prop drilling");
- At the top level `App` component, we create a `setTodoStatus` function that updates the state being handled by the `useState` hook.  That callback function is passed into the `TodoList` component which in turn passes it to the `TodoItem` component. 
- Any time the todo is toggled, the `TodoItem` calls the passed in callback and the state is kept in sync.

#### Vanilla

The vanilla implementaion is rather straightforward.  

- Every time a todo row is created using the `createTodo` function, we're attaching an event handler to the `'change'` event of the checkbox input.  
- The change event handler calls the `toggleTodo` function which updates the todo in the array and then rerenders the whole list.

Again, this results in similar performance issues as the list size grows.

### `step-4` - Delete Todo

#### Angular

- Added the `deleteTodo` method to `TodoService`
- Added an event emitter to the `TodoComponent` to emit a `deleteTodo` event when the user clicks the delete button.
- Updated the `TodoListComponent` to pass the `deleteTodo` event to its parent.
- Updated the `AppComponent` to call the `TodoService::deleteTodo` method when the `deleteTodo` event is emitted by the todo list component.

#### React

- Updated the `TodoItem` component to accept a callback that gets called when the delte button is clicked.
- Updated hte `TodoList` component to accept a callback that gets passed to the `TodoItem` component.  This callback handles the deletion of a single todo from the list.
- Added a callback to the `App` component that sets the todo list to a new list with a single todo filtered out by its ID.  That callback gets passed into the `TodoList` `deleteTodo` prop.

#### Vanilla

- Added a `deleteTodo` funciton that updates the global list by filtering out the matching ID and rerenders the whole TODO list after that update is complete.

### `step-5` - Toggle Todo View

#### Angular

**`TodoService`**
- Added the `setViewType` method to `TodoService` and a public readonly property `viewType` to enable consumers to get the current view type.
- The `TodoService` now returns a filtered list of `Todo`s in the `todos()` getter.

**`ViewTogglerComponent`**
- Added a new component to encapsulate view selection.  The component renders an array of data containing the a `TodoViewType` and the label to display on the button. Each of the buttons has classes dynamicall set based on the `viewType` `@Input()` property.
- When one of the buttons is clicked, the component emits the `viewTypeChange` event which can be consumed by the parent component.

**`AppComponent`**
- Swap out static buttons for `app-view-toggler` component.
- Pass the current `viewType` from the `TodoService`.
- Intercepts the `viewTypeChange` event and calls the `setViewType` method in the service.

#### React

**`<ViewToggle />`**
- The `ViewToggle` component accepts the current view and a `setView` callback.
- The buttons are rendered and their class is set based on which view is currently active using the `calculateClass` local function.
- Any time one of the buttons is clicked, the `setView` function is called.

**`<App />`**
- Renders the `ViewToggle` component instead of the static buttons list, passing in the current view and a `setView` function.
- The current view and setter function are created using a `useState` hook.
- The filtered list of todos is created using the `useMemo` hook.  This hook takes a calculation function as its first argument and its dependencies as the second argument.  Any time one of the dependencies changes, the function will be called.  If they don't change, the memoized value is used.  This function produces a filtered list of todos from the original list and the current view.

#### Vanilla

- We start by storing a global variable with the current view.
- We update our render function to filter the list of Todos (this produces a new array and does not modify the original one) before rendering it on the screen.
- Event handlers are set up for each of the buttons in the `initViewToggles` function.  That function calls the `setTotoListView` function which in turn, updates the global view, re-renders the list, and then calls the `setButtonState` function which is responsible for updating the classes of the buttons based on the global view.

## Resources

* https://developer.mozilla.org/en-US/
* https://devdocs.io/