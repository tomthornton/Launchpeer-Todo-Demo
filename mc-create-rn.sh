#!/bin/bash

    if [ -z "$1" ]
      then
        echo "No project name supplied"
        exit 1
    fi
    npm install -g react-native-cli || sudo npm install -g react-native-cli
    rm -rf .git
    react-native init $1
    rsync -avz boilerplate/ $1
    rm -rf boilerplate README.md
    cd $1 && npm install --save react-native-router-flux react-redux redux redux-thunk axios redux-form parse react-dropzone react-native-google-places-autocomplete react-native-image-picker react-native-style-tachyons
    npm install --dev eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
    npm install && cd ..
    cp -R $1/* .
    rm -rf $1
    touch .gitignore
    echo "/node_modules
    bundle.js
    npm-debug.log
    .DS_Store
    /ios/.DS_Store
    /ios/build" > .gitignore
    touch .eslintrc
    echo "{
      "extends": "airbnb",
      "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "react/require-default-props": 0,
        "react/forbid-prop-types": 0,
        "no-console": 0,
        "react/sort-comp": 0,
        "quote-props": 0,
        "no-restricted-syntax": 0,
        "guard-for-in": 0,
        "max-len": 0,
        "no-use-before-define": 0,
        "react/jsx-first-prop-new-line": 0,
        "react/no-unescaped-entities": 0,
        "dot-notation": 0,
        "quotes": 0,
        "comma-dangle": 0,
        "react/prop-types": 0,
        "react/jsx-closing-bracket-location": 0,
        "class-methods-use-this": 0,
        "no-confusing-arrow": 0,
        "consistent-return": 0,
        "no-underscore-dangle": 0,
        "no-plusplus": 0,
        "no-case-declarations": 0,
        "jsx-a11y/interactive-supports-focus": 0,
        "no-param-reassign": 0,
        "global-require": 0,
        "camelcase": 0,
      },
      "globals": {
        "storage": false,
        "fetch": false,
        "btoa": false,
        "navigator": false,
        "window": false,
        "document": false,
        "localStorage": false,
        "Parse": false,
      }
    }" > .eslintrc
    touch rn-cli-config.js
    echo "const blacklist = require('./node_modules/metro/src/blacklist');

    module.exports = {
      getBlacklistRE() {
        return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
      },
    };" > rn-cli-config.js
    react-native link
    git init
    git add .
    git commit -m "Initial Commit"
    echo "Add new project remote: git remote add origin <origin>"