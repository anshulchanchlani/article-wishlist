# Article Wishlist

An Article-Wishlist App using React and Redux
  
### Pre-requisites

* NodeJS (v10.6.0 used )
* NPM (6.1.0 used)

### Setup
  Clone the repository to your local machine.
  ```
    npm install
    npm run start:prod  //Open http://localhost:8081
   
  ```

### Features

* Login using unique username: 'anshul' and password : 'anshul'. More users can be found in users.json under server/flat-file.
* Uses Passport JS local strategy and cookie session for authentication and session maintainance.
* After login, user lands on Items page, where they can search for items. Results are shown on the same page
* Each item has a favorite icon on the top-right ( a heart!), which when clicked, will add the item to the user's wishlist.
* Deselecting the favorite icon (in wishlist or items) will remove the item from the wishlist.
* If an item exists in the user's wishlist and the same item is presented in the results, the favorite or heart icon is filled.(It is bordered    when the item is not favorite)
* Wishlist of a user is persistent (via flat-file to keep it simple) and can be seen anytime user logs in.
* UI is responsive.
* Only after logging in, user can search for items and add them to their favorite list
* Dockerfile is provided at the root of the project. Visit the 'Docker' section for more info on usage.
* Audit reports are generated at the root of the project. (uses Lighthouse)
* A sample pipeline flow is also given at the root of the project (Pipeline-Sample.txt)
* This project's configuration was done from scratch and doesn't use any boilerplate.

### Tests
``` 
   npm run test       //to run test cases. Please make sure the server is stopped before running the test cases.

```
### Performance
* Run performance and audit tests.

  First, run the express server in one terminal.
  ```
    npm run start:prod
  ```
  Then, in another instance of terminal run,
  ```
    npm run audit
  ```
  This will open the performance report after simulation.
  
* Different webpack profiles for Production and Dev
* GZip Compression used in Express Server
* Hot Module Replacement for dev server


### Libraries Used

* ReactJS
* Jest
* Redux
* Webpack
* ExpressJS
* Lighthouse
* PassportJS

### Docker

To run this project as a docker image in a container, follow these steps:

1. Make sure Docker is installed in your machine. Visit https://docs.docker.com/install/ for more info.

Once Docker is installed, go to Terminal and navigate to the root of the project and run

```
   docker build . -t article-wishlist     // you can give any other name to image instead of 'article-wishlist'

```
2. After successful completion of the command, image should have been created. ( You can run ``` docker images ``` and check the image name)
```
   docker  run -p 8081:8081  article-wishlist    // This will run a docker container with port forwarding 8081->8081. 

```
