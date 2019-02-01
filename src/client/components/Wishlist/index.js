import React, { Component } from 'react';
import requireAuth from '../hocs/requireAuth'
import {connect} from 'react-redux';
import {fetchWishlistItems} from '../../actions/wishlistActions'
import Item from '../Item'
import './index.scss'
class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.renderWishlistItems = this.renderWishlistItems.bind(this)
    }
    componentDidMount(){
        this.props.fetchWishlistItems();
    }
    renderWishlistItems(){
      return  this.props.wishlist.map((item)=>{
        return <Item isFav={true} key={item.url} item={item}/>
        })
    }
    render() {
        const wishlistItems = this.props.wishlist?this.renderWishlistItems():[];
        return (
            <main>
                {wishlistItems.length>0?
                <ul className="items-list">
                    {wishlistItems}
                </ul>:null}
            </main>
        );
    }
}

function mapStateToProps({wishlist}){
    return {wishlist}
}

export default connect(mapStateToProps,{fetchWishlistItems})(requireAuth(Wishlist));