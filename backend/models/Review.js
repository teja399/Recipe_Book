const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide a rating between 1 and 5'],
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'Review must belong to a recipe'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent duplicate reviews from the same user on the same recipe
reviewSchema.index({ recipe: 1, user: 1 }, { unique: true });

// Static method to calculate average ratings
reviewSchema.statics.calcAverageRatings = async function (recipeId) {
  const stats = await this.aggregate([
    {
      $match: { recipe: recipeId },
    },
    {
      $group: {
        _id: '$recipe',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await this.model('Recipe').findByIdAndUpdate(recipeId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await this.model('Recipe').findByIdAndUpdate(recipeId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Update recipe ratings after saving a review
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.recipe);
});

// Update recipe ratings after updating or deleting a review
reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.recipe);
  }
});

// Populate user data when querying reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar',
  });
  next();
});

module.exports = mongoose.model('Review', reviewSchema);
