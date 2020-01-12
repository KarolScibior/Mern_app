import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: String,
    required: true
  },
  owner: {
    type: Object,
    required: true
  }
});

const Movie = mongoose.model('movies', MovieSchema);

export default Movie;
