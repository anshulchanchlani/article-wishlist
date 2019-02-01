import React, { Component } from 'react';
import StarRatings from 'react-star-ratings'
import {connect} from 'react-redux'
import {addItemToWishlist,deleteFromWishlist} from '../../actions/wishlistActions'
import './index.scss'
class Item extends Component {
    constructor(props){
        super(props)
        this.state ={isFav:this.props.isFav?this.props.isFav:false}
        this.handleFavClick = this.handleFavClick.bind(this)
    }
    changedImageSize(imgUrl) {
        if (imgUrl) {
            return `${imgUrl.split('?')[0]}?sw=300&sh=300&sm=fit`
        }
    }
    handleFavClick(){
        let item = this.props.item;
        this.setState({isFav:!this.state.isFav},()=>{
            this.state.isFav?this.props.addItemToWishlist(item):this.props.deleteFromWishlist(item);
        })
        
    }
    returnStarRatings(stars){
      let rating = Number.isInteger(+stars)?+stars:0;
      return  <StarRatings
          rating={rating}
          starRatedColor="black"
          changeRating={this.changeRating}
          numberOfStars={5}
          starDimension="20px"
          starSpacing="7px"
          name='rating'
        />
    }
    render() {
        const { item } = this.props
        return (

            <li> 
                <div className="item">
                  
                    <i onClick={this.handleFavClick} className="material-icons add-to-wishlist-icon">
                        {this.state.isFav?'favorite':'favorite_border'}
                    </i>
                 
                    <a href={item.url} target="_blank">
                    <div className="wrapper-style">
                        <div>
                            <img src={this.changedImageSize(item.image)} width="250px" alt={item.subtitle} height="250px" />
                        </div>
                        <div><span>{item.suggestion}</span></div>
                        <div><span className="item-subtitle">{item.subTitle}</span></div>
                        <div><span title="price">{item.salePrice ? item.salePrice : item.standardPrice}</span></div>
                        <div><span title="preorder">{item.isPreorder ? 'Available for Preorder' : 'Not available for preorder.'}</span></div>
                        <div><strong>{this.returnStarRatings(item.rating?item.rating:0)}</strong></div>
                    </div>
                    </a>
                </div>
            </li>

        );
    }
}


export default connect(null,{deleteFromWishlist,addItemToWishlist})(Item);
