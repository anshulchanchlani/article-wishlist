import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Item from '../Item'
import SearchBar from '../SearchBar'
import Loading from '../Loading'
import requireAuth from '../hocs/requireAuth'
import {itemExistsInWishlist} from '../../../utils'
import {fetchItemsOnSearchTerm} from '../../actions/itemActions'
import {fetchWishlistItems} from '../../actions/wishlistActions'

import './index.scss'
class ItemsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { finalSearchTerm:null };
        this.findItems= this.findItems.bind(this)

    }
    componentDidMount(){
        this.props.fetchWishlistItems();
    }
    isFavItem(item){
      return  (itemExistsInWishlist(this.props.wishlist,item))
    }
    renderSuggestions(){
      let self = this;
      return  this.props.items.products.map((product)=>{
            return <Item isFav={self.isFavItem(product)} key={product.url} item={product}/>
        }) 
    }
    findItems(searchTerm){
        if(searchTerm && searchTerm!==''){
            this.props.fetchItemsOnSearchTerm(searchTerm)
            this.setState({finalSearchTerm:searchTerm})
        }
    }

    render() {
        
        return (
            <main>
                <SearchBar findItems={this.findItems} />
                {this.props.items.isFetching?<Loading/>:null}
                {this.state.finalSearchTerm && !this.props.items.isFetching? 
                    <h6 className="search-result-for-style">Search results for "{this.state.finalSearchTerm}"</h6>:null}
                {this.props.items.products && <hr/>}
                <ul className="items-list">
                    {this.props.items.products?this.renderSuggestions():null}
                </ul>
                {this.props.items.itemsNotReceived  ?<h6>No results found.</h6>:null}
            </main>
        );
    }
}

function mapStateToProps(state){
    return {items:state.items,wishlist:state.wishlist}
}
export default connect(mapStateToProps,{fetchItemsOnSearchTerm,fetchWishlistItems})(requireAuth(ItemsContainer));