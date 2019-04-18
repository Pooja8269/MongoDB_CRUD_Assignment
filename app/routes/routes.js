const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const movie_data = require('../controllers/controller.js');

    /** @author Pooja Sharma / Create a new movie data. */ 
    router.post('/', movie_data.create);

    /** @author Pooja Sharma / Retrieve all data. */ 
    router.get('/', movie_data.findAll);

    /** @author Pooja Sharma / Retrieve a single data with Film_Id. */ 
    router.get('/:Film_id', movie_data.findOne);

    /** @author Pooja Sharma / Update a data with Film_Id. */ 
    router.put('/:Film_id', movie_data.update);

    /** @author Pooja Sharma / Delete a data with Film_Id. */ 
    router.delete('/:Film_id', movie_data.delete);

    module.exports = router;  