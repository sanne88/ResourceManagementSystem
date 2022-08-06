/** Express router providing user related routes
 * @module routers/main
 * @requires express
 */
/**
 * express module
 * @const
 */
const express = require('express');
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace mainRouter
 */
const router = express.Router();
/**
 * Route tocheck server health
 * @name /
 * @function
 * @memberof module:routers/main~mainRouter
 */
router.get('/', (req, res) => {
    res.status(200).json({
       status: 'Server Run successfully'
    })
 });

 module.exports = router; 