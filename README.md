# zeraki-app

## Aim of the project

The goal of this project is to produce a newsfeed for activities.
The idea is this:
As a user, you see a sidebar with a list of your "friends". You can click each friend in the
sidebar and see their list of generated content. Or, you can click a button (e.g "All") to see the
canonical newsfeed.
Newsfeed stories can have different types. For example, you can have newsfeed items that
say "X added Y as a friend", "P liked Z item", "T uploaded a new photo". The design of the
newsfeed items must be consistent (e.g. each have the ability to comment, favourite, etc).
Hint: newsfeed items have 3 components: subject, action, object (e.g. X[subject]
added[action] Y[object]).

Extra features implemented:
---
    - Routing
    - Code splitting
    - State management
    - Modularization
    - Mobile-first design

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
