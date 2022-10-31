const express = require('express');

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router.route('/uploadImage').post(uploadImage);
router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteAllProduct);
router.route('/:id/reviews').get(getProductReview);