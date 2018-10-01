
# Day2 Hair

Day2 is a simple hairstyle recommender for times when you need a little inspiration. Style options can change depending on the length of one's hair, and how long it's been since the last wash. Day2 allows the user to create an account, and filter styles by length and clean/dirty status. Once the filtered results are displayed the user can 'favorite' a style to view later.

The project was created for my wife who often goes a day or two between hair washings. Since she needs to look professional and fashion forward for her job, coming up with new styles everyday can be a chore. With Day2 one can spend less time searching Pinterest in the morning for inspiration and get styling faster!

## Project Links
- [Live application](https://day2-capstone-client.herokuapp.com/)
- [Server code repository](https://github.com/neillsom/Day2_capstone-server) 
- [Client code repository](https://github.com/neillsom/Day2_capstone-client)
## Screenshots
Day2 Style List:

![Day2 Style List](https://c2.staticflickr.com/2/1962/30088944857_a7fbe7ef25_o.jpg)

Day2 Login Page:

![Day2 Login Page](https://c2.staticflickr.com/2/1920/30088945017_96e7a68831_o.jpg)

Day2 User Favorites:

![Day2 User Favorites](https://c2.staticflickr.com/2/1951/31152388578_d3b2ff7571_o.jpg)

## Tech Used

### Front-End
-   React
-   Redux
-   HTML
-   CSS

### Back-End
-   Node
-   Express
-   MongoDB
-   Mongoose
-   Passport
-   Bcrypt

### Testing and Deployment
-   Mocha
-   Chai

### Deployment
-   Heroku
-   mLab

## Code Examples

### User endpoints for adding and removing favorites
```javascript
// PUT new style to user favorites
router.put('/style/:styleId', jwtAuth, (req, res, next) => {
  const styleId = req.params.styleId;
  User.findOneAndUpdate({'username': req.user.username}, {
    $push: { favorites: styleId }
  }, {new: true})
    .then(result => {

      if (result) {
        res.json(result);
      } else {
        next();
      }
    }).catch(err => {
      console.error(err);
      next(err);
    });
});

// Remove style from user favorites
router.put('/style/remove/:styleId', jwtAuth, (req, res, next) => {
  const styleId = req.params.styleId;
  User.findOneAndUpdate({'username': req.user.username}, {
    $pull: { favorites: styleId }
  }, {new: true})
    .then(result => {

      if (result) {
        res.json(result);
      } else {
        next();
      }
    }).catch(err => {
      console.error(err);
      next(err);
    });
});
```

### Style List component
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { fetchStylesFromApi, addToFavorites } from '../actions/styles'
import './styles/style-list.css'

class StyleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: props.styles
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchStylesFromApi())
  }

  render() {
    const styles = this.props.styles.map((style, index) =>
      <section key={index} className="card">

        <figure className="card__thumbnail">
          <img src={style.imgUrl} alt={style.title} />
          <main className="card__description">
            <header className="card__title">
              <h3>{style.title}</h3>
            </header>
            <p>Length: {style.length}</p>
          </main>
        </figure>
        <a href="#" className="button"
          onClick={() => this.props.dispatch(addToFavorites(style.id, localStorage.getItem('authToken')))}
          name="add-to-favorites">Add to favorites
        </a>

      </section>
    )

    return (
      <div className="card-container">
        {styles}
      </div>
    )

  }
}

const mapStateToProps = state => ({
  styles: state.style.styles
})

export default connect(mapStateToProps)(StyleList)
```
## Installation
- Set up Server
  - Clone the server repository: `git clone https://github.com/neillsom/Day2_capstone-server.git YOUR_SERVER_PROJECT_NAME`
  - Move into the project directory: `cd YOUR_SERVER_PROJECT_NAME`
  - Install dependencies: `npm install`
  - Start the server: `npm start`
- Set up Client
  - Clone the client repository: `git clone https://github.com/neillsom/Day2_capstone-client.git YOUR_CLIENT_PROJECT_NAME`
  - Move into the project directory: `cd YOUR_CLIENT_PROJECT_NAME`
  - Install dependencies: `npm install`
  - Start the client: `npm start`
  - React should open a new browser window pointing to [localhost:3000](localhost:3000). If it does not, simply visit the address in the browser. 
- Set up local database
  - Start Mongo database: `mongod`
  - Seed database:
    - From `YOUR_SERVER_PROJECT_NAME` directory: `node db/seed/questions.json`

## License
MIT License
Copyright (c) 2018 Neill Somerville

#### http://neillsomerville.com