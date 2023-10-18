# Naming Conventions

Naming conventions to improve the readability and understandability of the code.

## variables and functions
camelCase for variables and functions, such as fetchPosts and updateProfile. This standard convention in JavaScript makes it easier to read the code.

## React components
PascalCase for components such as ProfilePage and PostList. This standard React convention helps distinguish components from other types of code.

## default file naming
For files that do not fit the above category use dashes. i.e: post-list.js

# File Structure

- The components folder contains the React components for the app.
- containers folder contains the containers for the app. containers are parent objects of components where components share the same set of data.
- context folder contains the context for the app. context is a way to pass data through the component tree without having to pass props down manually at every level.
- utils folder contains the utility functions for the app such as "fetchFunctions.js"
