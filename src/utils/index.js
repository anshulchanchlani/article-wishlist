const deleteItemFromWishlist=(arr, item)=> {

    return arr.filter(function (ele) {
        return ele.url != item.url;
    });
}


 const itemExistsInWishlist= function(state,newItem){
    let flag= false;
    if(state.length>0)
    { 
        state.forEach((item)=>{
        if(item.url===newItem.url){
            flag=true;
            return true;
        }
    })}
    return flag;
}

const validateItem =function(item){
    return item && item.image && item.suggestion && item.url
}
const validateCredentials = function(username,password){
    return username && password && username!=='' && password!==''
}


const updateWishlistForUser=(arr, username, items)=> {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].username === username) {
            arr[i].items = items;
            break;
        }
    }
    return arr;
}

const existingUserWishlistExists=(arr, username) =>{
    let foundUsername = null;
    
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          
            if (Object.keys(arr[i]).username === username) {
                foundUsername = arr[i];
                break;
            }
        }
    }
    return foundUsername;
}

const fetchWishlistBasedOnUser =(fs,path,username,cb)=>{
    fs.readFile(path, function (err, unparsedData) {
        if (err) {
            throw err;
        }
        let items =[];
        let data = JSON.parse(unparsedData);
        if(data.wishlist && data.wishlist.length>0){
            for (let i = 0; i < data.wishlist.length; i++) {
                if (data.wishlist[i].username === username) {
                    items = data.wishlist[i].items;
                    cb(null,items)
                }
            }
        }
    }
)}



const deleteWishlistItemFromFlatFile=(fs,path,schemaObject)=> {
    fs.readFile(path, function (err, unparsedData) {
        if (err) {
            throw err;
        }
        let usersWishlist=[];
        let data = JSON.parse(unparsedData);
        if (data.wishlist && data.wishlist.length > 0) {
            for (let i = 0; i < data.wishlist.length; i++) {
                if (data.wishlist[i].username === schemaObject.username) {
                    usersWishlist = data.wishlist[i].items;

                    usersWishlist = deleteItemFromWishlist(usersWishlist, schemaObject.item)

                    data.wishlist = updateWishlistForUser(data.wishlist, schemaObject.username, usersWishlist)
                    fs.writeFile(path, JSON.stringify(data), 'utf8', function (err) {

                    })
                    break;
                }
            }

        } else {
            res.status(404).send({ status: "error", message: "Resource not found to delete." })
        }
    })
}

const writeItemsToFlatFile=(fs,path,schemaObject, cb) =>{

    fs.readFile(path, function (err, unparsedData) {
        if (err) {
            throw err;
        }

        let data = JSON.parse(unparsedData);
        let usersWishlist = [];
        let usernameFound = false;
        if (data.wishlist && data.wishlist.length > 0) {

            for (let i = 0; i < data.wishlist.length; i++) {
                if (data.wishlist[i].username === schemaObject.username) {
                    usersWishlist = data.wishlist[i].items;
                    usersWishlist.push(schemaObject.item)
                    usernameFound = true;
                    break;
                }
            }

        } 

        if (!usernameFound) {
            usersWishlist.push(schemaObject.item)
            data.wishlist.push({ username: schemaObject.username, items: usersWishlist })
        } else {
            data.wishlist = updateWishlistForUser(data.wishlist, schemaObject.username, usersWishlist)
        }
        fs.writeFile(path, JSON.stringify(data), 'utf8', function (err) {

            cb();
        })

    })


}



module.exports ={
    itemExistsInWishlist,
    validateCredentials,
    validateItem,
    deleteItemFromWishlist,
    updateWishlistForUser,
    existingUserWishlistExists,
    fetchWishlistBasedOnUser,
    deleteWishlistItemFromFlatFile,
    writeItemsToFlatFile
}
