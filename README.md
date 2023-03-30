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

## What is a Single Page Application (SPA)?

- A single page application is a website or web application that dynamically rewrites a current web page with new data from the web server, instead of the default method of a web browser loading entire new pages.
- SPAs load "once" and then do all the work in the browsers JavaScript virtual machine, leveraging the DOM and Browser APIs.
- SPAs abstract the traditional DOM and Browser APIs and enable ways of thinking about a page or set of pages using other models.  Some ways of describing this models is using a declarative rendering model.  AKA: declare the shape of the page based on some data and a mix of JS and HTML and then let the framework take care of the actual business of generating and managing the elements on the page.
- SPAs enable more robust unit level testing of an individual part of a page and _can_ increase developer confidence in how their applicaiton behaves.
- SPAs enable component based design.  This means a page can be broken down into individual parts and each can be developed in isolation of the others using a well defined API. (see example component breakdown)

**Note:** The example app we're demoing today isn't a perfect example of something that I would use an SPA for.  Typically we'd leverage an SPA for something "larger" with more complex requirements.

## Example App Requirements

1. App should display a list of TODOs
2. The user should be able to enter a new TODO, press enter, and have it added to the end of the list.
3. App should display todos in the order they are added.
4. App should allow the user to toggle the status of a TODO (done / undone).
5. App Should allow the user to delete a TODO from the list.
6. App should allow the user to select their "view" of the TODOs:
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

## Resources

* https://developer.mozilla.org/en-US/
* https://devdocs.io/