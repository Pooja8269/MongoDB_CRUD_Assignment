const Movies_schema = require('../schema/schema.js'); 

/** @author Pooja Sharma / Add new movie data. */
exports.create = async (req, res) => {

  const movies = new Movies_schema({
      Film_Category: req.body.Film_Category,
      Film_Title: req.body.Film_Title,
      Actors:req.body.Actors,
      Castandcrew : req.body.Castandcrew,
      Release_Date: req.body.Release_Date,
      Film_Rating: req.body.Film_Rating,
      Box_Office_Status : req.body.Box_Office_Status
      });

 try{
      const movie = await movies.save();
      res.status(201).send(movie);
    
    } catch(err) {
      res.status(500).send({
      message: err.message || "Some error occurred while adding the new data."
    });
  };
}; 

/** @author Pooja Sharma / Retrieve all data from the database. */
exports.findAll = async(req, res) => {
  try{
      const movie =  await Movies_schema.find({}).exec();
      res.status(400).send(movie);
    } catch(err){
      res.status(500).send({
      message: err.message || "Some error occurred while retrieving the data."
    });
  };
};

/** @author Pooja Sharma /Retrieve a single data with a Film_Id. */ 
exports.findOne = async(req, res) => {
 try{
      const movie = await Movies_schema.findById(req.params.Film_id).exec();
      if(!movie){
        console.log("Movie not found with id. " + req.params.Film_id);
      }
      res.status(200).send(movie);
    } catch(err){
      return res.status(500).send({
      message: "Movie not found, error occurred while retrieving the data with id. " + req.params.Film_id
    });
  };
}; 

/** @author Pooja Sharma /Update a data identified by the Film_Id in the request. */
exports.update = async(req, res) => {
try{
    const movie = await Movies_schema.findByIdAndUpdate(req.params.Film_id,req.body).exec();
    if(!movie){
      console.log("Movie not found with id. " + req.params.Film_id);
    }
    res.status(200).send(movie);
  }catch(err) {
    return res.status(500).send({
    message: "Movie not found, error occurred while updating the data with id. " + req.params.Film_id
    });
  }; 
}

/** @author Pooja Sharma /Delete a movie data with the specified Film_id. */
exports.delete = async (req, res) => {
  try{
      const movie = await Movies_schema.findByIdAndRemove(req.params.Film_id).exec();
      if(!movie){
        console.log("Movie not found with id. " + req.params.Film_id);
      }
      res.status(200).send({
      message: "Data deleted successfully!"
    })
    }catch(err) {
      return res.status(500).send({
      message: "Movie not found, error occurred while deleting the data with id. " + req.params.Film_id
    });
  };
};