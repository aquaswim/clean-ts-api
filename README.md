# Typescript clean code
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)


Clean code using typescript when buidling api

## How to start
1. Clone this repo
1. create the .env (the template is in .env.example)
1. install dependency
   ```
   npm install
   ```
1. build the app
   ```
   npm run compile
   ```
1. *Configure other stuf (db,cache,search etc)*
1. start the app
   ```
   npm run start
   ```

## How to create unit test
All unit test files will reside in `./src` directory alongside with module that will be tested, and must be named with prefix `.spec.ts`.
To run the unit test run `npm run test`
