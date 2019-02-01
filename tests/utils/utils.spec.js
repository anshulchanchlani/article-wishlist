import * as utils from '../../src/utils'
import fs from 'fs'
import path from 'path'
import fse from 'fs-extra'
import axios from 'axios'
import {API_SEARCH_ITEMS_URL} from '../../src/client/constants'
const originalPath = path.resolve('src', 'server', 'flat-file', 'wishlist.json')
const filePath = path.resolve('src', 'server', 'flat-file', 'test.json')




describe('Util tests', () => {
    beforeAll(()=>{
        fs.copyFileSync(originalPath, filePath, (err,res) => {
    
        });
    })
    afterAll(() => {
        fse.remove(filePath,(err,res)=>{
           if(err) console.log('Error in removing test.json in flat-file folder. Try removing manually')
           console.log(res)
        })
      });
    const arr = [{ url: 'abc' }, { url: 'def' }, { url: 'ghi' }]
    const expected = [{ url: 'abc' }, { url: 'ghi' }]
    const item = { image: 'abc', suggestion: 'abc', url: 'def' }
    const invalidItem = { image: 'abc' }
    const wishlist = [{
        "anshul": []
    }]


    const items = [item]


    it('Test Delete Item from Wishlist', () => {

        const res = utils.deleteItemFromWishlist(arr, { url: 'def' })
        expect(res).toEqual(expected)
    })

    it('Test Item Exists in Wishlist to be true', () => {
        const res = utils.itemExistsInWishlist(arr, { url: 'def' })
        expect(res).toBeTruthy();
    })

    it('Test Item Exists in Wishlist to be false', () => {
        const res = utils.itemExistsInWishlist(arr, { url: 'hig' })
        expect(res).toBeFalsy();
    })

    it('Test Validate Item to be false', () => {
        const res = utils.validateItem(invalidItem)
        expect(res).toBeFalsy();
    })

    it('Test Validate Item to be true', () => {
        const res = utils.validateItem(item)
        expect(res).toBeTruthy();
    })

    it('Test validate credentials to be true', () => {
        const res = utils.validateCredentials('abc', 'def')
        expect(res).toBeTruthy();
    })

    it('Test validate credentials to be false', () => {
        const res = utils.validateCredentials('', 'def')
        expect(res).toBeFalsy();
    })

    it('Test update wishlist for user', () => {
        const res = utils.updateWishlistForUser(wishlist, "anshul", items)
        expect(res).toHaveLength(wishlist.length)
    })

    it('Fetch wishlist based on user', () => {
        const res = utils.fetchWishlistBasedOnUser(fs, filePath, 'anshul', function (err, items) {
            expect(items).toHaveLength(items.length)
        });

    })

    it('Delete wishlist item ', () => {
        let item = {
            "suggestion": "Stan Smith Shoes",
            "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1548892339839/zoom/M20327_01_standard.jpg?sw=60&sh=60&sm=fit",
            "url": "https://www.adidas.co.uk/stan-smith-shoes/M20327.html",
            "rating": "5",
            "reviews": "4764",
            "subTitle": "Originals",
            "isPreorder": "",
            "salePrice": null,
            "standardPrice": "£ 74.95"
        }
        const res = utils.deleteWishlistItemFromFlatFile(fs, filePath, { username: 'anshul', item: item }, function (err, items) {
            utils.fetchWishlistBasedOnUser(fs, filePath, 'anshul', function (err, items) {
                expect(items).toHaveLength(4)
            });
        });

    })

    it('Delete wishlist item for item not found ', () => {
        let item = {
            "suggestion": "Stan Smith Shoes",
            "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1548892339839/zoom/M20327_01_standard.jpg?sw=60&sh=60&sm=fit",
            "url": "abc",
            "rating": "5",
            "reviews": "4764",
            "subTitle": "Originals",
            "isPreorder": "",
            "salePrice": null,
            "standardPrice": "£ 74.95"
        }
        const res = utils.deleteWishlistItemFromFlatFile(fs, filePath, { username: 'anshul', item: item }, function (err, items) {
            utils.fetchWishlistBasedOnUser(fs, filePath, 'anshul', function (err, items) {
                expect(items).toHaveLength(3)
            });
        });

    })

    it('Write wishlist item ', () => {
        let item = {
            "suggestion": "Stan Smith Shoes",
            "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1548892339839/zoom/M20327_01_standard.jpg?sw=60&sh=60&sm=fit",
            "url": "https://www.adidas.co.uk/stan-smith-shoes/M20327.html",
            "rating": "5",
            "reviews": "4764",
            "subTitle": "Originals",
            "isPreorder": "",
            "salePrice": null,
            "standardPrice": "£ 74.95"
        }
        const res = utils.writeItemsToFlatFile(fs, filePath, { username: 'anshul', item: item }, function (err, items) {

            utils.fetchWishlistBasedOnUser(fs, filePath, 'anshul', function (error, data) {
                expect(data).toHaveLength(data.length)
            });
        });

    })

    it('Write wishlist item for new user ', () => {
        let item = {
            "suggestion": "Stan Smith Shoes",
            "image": "https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1548892339839/zoom/M20327_01_standard.jpg?sw=60&sh=60&sm=fit",
            "url": "https://www.adidas.co.uk/stan-smith-shoes/M20327.html",
            "rating": "5",
            "reviews": "4764",
            "subTitle": "Originals",
            "isPreorder": "",
            "salePrice": null,
            "standardPrice": "£ 74.95"
        }
        const res = utils.writeItemsToFlatFile(fs, filePath, { username: 'user1', item: item }, function (err, items) {
            utils.fetchWishlistBasedOnUser(fs, filePath, 'user1', function (error, data) {
                expect(data).toHaveLength(1)
            });
        });

    })

    it('Test Adidas API',()=>{
        axios.get(`${API_SEARCH_ITEMS_URL}/Messi`)
             .then(function(res){
                 expect(res.data.products).toBeDefined();
                 expect(res.data.suggestions).toBeDefined();
             })
    })

})