const fs = require('fs');

const path = require('path')
const { validateItem } = require('../utils')
const isAuthenticated = require('./requireLogin')
let wishlist = require('./flat-file/wishlist')
const Schema = require('./flat-file/schema')
const {deleteItemFromWishlist,
        updateWishlistForUser,
        fetchWishlistBasedOnUser,
        deleteWishlistItemFromFlatFile,
        writeItemsToFlatFile} = require('../utils')
const filePath = path.resolve(__dirname, 'flat-file', 'wishlist.json')

module.exports = app => {
    app.post('/wishlist/add', isAuthenticated, (req, res) => {

        if (validateItem(req.body.item)) {
            writeItemsToFlatFile(fs,filePath,Schema(req.user.username, req.body.item), function () {
                res.status(200).send({ status: "OK", message: "Add to wishlist successful" });
            })

        } else {
            res.send({ status: "error", message: "Invalid Item" })
        }
    })

    app.post('/wishlist/remove', isAuthenticated, (req, res) => {

        if (validateItem(req.body.item)) {
            deleteWishlistItemFromFlatFile(fs,filePath,Schema(req.user.username, req.body.item));
            res.status(200);
        } else {
            res.send({ status: "error", message: "Invalid Item" })
        }
    })

    app.get('/wishlist',isAuthenticated,(req,res)=>{
         fetchWishlistBasedOnUser(fs,filePath,req.user.username,function(err,data){
            res.status(200).send(data);
        });    
    })
}









