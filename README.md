
# Portfolio React App

This is a React-based web application designed to showcase my professional portfolio and blog entries. It includes interactive elements and responsive design to provide an optimal viewing experience across a variety of devices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Follow the steps below to set up your local environment and deploy the application using GitHub Pages.

### Prerequisites

To run this project locally, you'll need to have the following installed:

- Node.js (preferably the latest LTS version)
- npm (Node Package Manager), which comes with Node.js
- Git, for version control

### Installing

First, clone the repository to your local machine:

```bash
git clone https://github.com/franpandol/franpandol.github.io
mv franpandol.github.io portfolio-blog-react-app
cd portfolio-blog-react-app
```

Then, install the necessary dependencies:

```bash
npm install
```

### Running Locally

To start the application locally, run the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser. By default, the app will be available at [http://localhost:3000](http://localhost:3000).

### Testing

To run the test suite:

```bash
npm test
```

### Deployment

This project can be deployed using GitHub Pages with the following steps:

1. First, install the `gh-pages` package:

   ```bash
   npm install gh-pages --save-dev
   ```

2. Add the following scripts to your `package.json` file:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   },
   ```

3. Update the `homepage` field in your `package.json` file:

   ```json
   "homepage": "https://your-github-username.github.io/",
   ```

   Replace `your-github-username` with your actual GitHub username.

4. Run the deployment script:

   ```bash
   npm run deploy
   ```

   This command builds the app for production to the `build` folder and deploys it to GitHub Pages.

5. Your app should now be live at the URL provided in the `homepage` field of your `package.json`.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Create React App](https://github.com/facebook/create-react-app) - Toolchain used to setup the development environment

## Authors

- **Fran Pandol** - [franpandol](https://github.com/franpandol)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
