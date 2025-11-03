const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a recipe title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    cuisine: {
      type: String,
      required: [true, 'Please provide a cuisine type'],
      enum: [
        'north-indian',
        'south-indian',
        'chinese',
        'italian',
        'mexican',
        'thai',
        'other',
      ],
    },
    prepTime: {
      type: Number,
      required: [true, 'Please provide preparation time in minutes'],
      min: [1, 'Preparation time must be at least 1 minute'],
    },
    cookTime: {
      type: Number,
      required: [true, 'Please provide cooking time in minutes'],
      min: [0, 'Cooking time cannot be negative'],
    },
    servings: {
      type: Number,
      required: [true, 'Please provide number of servings'],
      min: [1, 'Servings must be at least 1'],
    },
    ingredients: [
      {
        name: {
          type: String,
          required: [true, 'Please provide ingredient name'],
          trim: true,
        },
        quantity: {
          type: Number,
          required: [true, 'Please provide quantity'],
          min: [0, 'Quantity cannot be negative'],
        },
        unit: {
          type: String,
          enum: [
            'g',
            'kg',
            'ml',
            'l',
            'tsp',
            'tbsp',
            'cup',
            'piece',
            'pinch',
            'to taste',
          ],
          default: 'piece',
        },
      },
    ],
    instructions: [
      {
        step: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: [true, 'Please provide instruction description'],
          trim: true,
        },
      },
    ],
    image: {
      type: String,
      default: 'default-recipe.jpg',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipe must belong to a user'],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate reviews
recipeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'recipe',
  localField: '_id',
});

// Indexes
recipeSchema.index({ title: 'text', description: 'text' });
recipeSchema.index({ cuisine: 1, ratingsAverage: -1 });

// Middleware to populate user data
recipeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar',
  });
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
