# ANIMEEIGA <img src="src/components/img/logo.png" alt="AnimeEiga Logo" width="100px"/>

AnimeEiga is a responsive web application designed for anime movie enthusiasts to explore and manage their favorite movies. The app is built using the MERN stack (MongoDB, Express, React, Node.js) and deployed on Heroku with MongoDB Atlas as the database service. Users can create profiles, browse a collection of anime movies, and save their favorites for easy access later.

## Features

- **User Authentication:** Users can securely register, log in, and log out.
- **User Profiles:** Users can create and update their profiles, view registration details, and manage their list of favorite movies.
- **Movie Catalog:** Browse a wide range of anime movies, view detailed information, and add movies to your favorites list.
- **Search Functionality:** Users can filter movies in real-time using the search bar.
- **Responsive Design:** The app is fully responsive, providing a seamless experience on both mobile and desktop devices.
- **Favorites Management:** Users can add or remove movies from their favorites directly from the movie catalog or profile page.
- **State Routing:** The app uses state routing to navigate between views and maintain shareable URLs.

## Views

### Main View
- Displays all movies with images, favorite status and a button to take the user to Single Movie View for more information.
- Allows users to filter the list of movies using the search feature.
- Provides navigation to the Profile view.
- Allows users to log out.

### Single Movie View
- Displays detailed information about a movie, including description, genre, director, and image.
- Allows users to add or remove the movie from their favorites list.

### Login View
- Allows users to log in with a username and password.

### Signup View
- Allows new users to register with a username, name, password, email, and date of birth.

### Profile View
- Displays user registration details.
- Allows users to update their information (name, email, date of birth).
- Shows the user's list of favorite movies.
- Allows users to remove a movie from their list of favorites.
- Allows existing users to deregister.

## Technologies Used

- **Frontend:** React, React Bootstrap, Parcel
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Heroku, Netlify
- **Version Control:** Git, GitHub

## Deployment

The app is hosted on Netlify. You can access the live version here: [AnimeEiga on Netlify](https://anime-eiga.netlify.app/)

## Set Up Locally
### Clone Repository
Open your terminal and run the following.
```
git clone https://github.com/TheaWin/eiga-client.git
```

### Install Node.js, nvm, and npm
Check if you already have Node.js, nvm, and npm installed.
```
node -v
nvm -v
npm -v
```
If you don't have them installed, please follow this [guidance](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) to get them set up.

### Install Dependencies
1. Navigate to the cloned project in your terminal, so that you are in the root of the project.
2. Run `npm install` in the terminal while in the root folder of the project. This will automatically install all the required dependencies.

### Build Process
To run the application locally, initiate build process with Parcel using the following command:
```
parcel src/index.html
```
## API Used
The [AnimeEiga API](https://github.com/TheaWin/anime-eiga) is used for this client.

## Screenshots

![Home View](src/components/img/home-view.png)
*Home View with a list of all movies.*

![Profile View](src/components/img/profile-view.png)
*User Profile with favorite movies list.*

## Contact

Thea Win - [mstheawin@gmail.com](mailto:mstheawin@gmail.com)

Project Link: [https://github.com/TheaWin/eiga-client](https://github.com/TheaWin/eiga-client)
