const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'please provide product name'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        default: 0,
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    image: {
        type: String,
        default: '../uploads/aaditya-ailawadhi-D6pgxi3gwNQ-unsplash.jpg'
    },
    category: {
        type: String,
        required: [true, 'please provide product category'],
        enum: ['office', 'kitchen', 'electronics', 'bedroom'],
    },
    company: {
        type: String,
        required: [true, 'please provide company name'],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported'
        },
    },
    colors: {
        type: [String],
        default: ['#222'],
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    },
    freeShipping: {
        type: Boolean,
        default: false,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    inventory: {
        type: Number,
        requried: true,
        default: 15,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtues: true } });

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
})
// removing any review attached to the prodouct
ProductSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id })
})

module.exports = mongoose.model('Product', ProductSchema);