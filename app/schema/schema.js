const mongoose = require('mongoose');
const validate = require('mongoose-validator');

/** @author Pooja Sharma / Film title validation  */
const Title_Validator = [
  validate({
    validator: 'isLength', arguments: [3, 30], message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: function (title) {
      const title_val = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/g.test(title);
      return title_val;
    },
    message: 'Film title should contain alpha numeric characters only',
  }),
]

/** @author Pooja Sharma /  Name validation */
const Name_Validator = [
  validate({
    validator: 'isLength', arguments: [3, 30], message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: function (name) {
      const Name_val = /^[a-zA-Z ]*$/g.test(name);
      return Name_val;
    },
    message: 'Name should contain characters only',
  }),
]

/** @author Pooja Sharma / Movie ratings validation  */
const Rating_Validation = validate({
  validator: function (rating_value) {

    const rate = /^[1-5]*$/g.test(rating_value);

    if (rating_value <= 3) [true, 'Average movie.'];
    //console.log("Average movie");
    else console.log("Super hit movie");
    return rate;
  },
  message: "Please rate the movie between 1-5"
})

/** @author Pooja Sharma / Box office status validation */
const Status_Validator = validate({
  validator: function (val) {
    if (val == true) {
      return console.log("Hit Film");
    } else if (val == false) {
      return console.log("Flop Film");
    }
  },
})

/** @author Pooja Sharma / Application Schema */
const Movies_schema = mongoose.Schema({
  Film_Category: { type: String, required: true, validate: Name_Validator },
  Film_Title: { type: String, required: true, validate: Title_Validator },
  Actors: {
    Actress: { type: String, required: true, validate: Name_Validator },
    Actor: { type: String, required: true, validate: Name_Validator }
  },
  Castandcrew: [{
    Director: { type: String, required: true, validate: Name_Validator },
    Producer: { type: String, required: true, validate: Name_Validator },
    Artists: { type: Number, required: true }
  }],
  Release_Date: {
    type: String, required: true, validate: {
      /** Release_Date Validation */
      validator: function (v) {
        return /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/g.test(v);
      },
      message: props => `${props.value} is not a valid date! | Valid date shoude be in dd-mm-yyyy format`
    },
  },
  Film_Rating: { type: Number, required: true, validate: Rating_Validation },
  Box_Office_Status: { type: Boolean, required: true, default: false, validate: Status_Validator }
});

module.exports = mongoose.model('Movies_schema', Movies_schema);
