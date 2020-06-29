import React from 'react';
import {Link} from 'react-router-dom';

const initState = {
    items: [
        {id:1,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:`/images/item1.jpg`},
        {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: `/images/item2.jpg`},
        {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: `/images/item3.jpg`},
        {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:`/images/item4.jpg`},
        {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: `/images/item5.jpg`},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: `/images/item6.jpg`}
    ]
  }

class ItemList extends React.Component{
    render(){
        let itemList = initState.items.map((item,id) => {
            return (
              <div className="col-sm-4">
                 <div className="product-card mr-2 bg-light-gray shadow-sm mb-3">
              <div className="badge">New</div>
              <div className="product-tumb">
                <img className="w-100" src={item.img} alt={item.title} />
              </div>
              <div className="product-details p-2">
                <span className="product-catagory">Women,clothes</span>
                <h4><a href>{item.title}</a></h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                
              </div>
            </div>
              </div>
            );
          });
    
        return(
            <div>
                {itemList}
            </div>
        )
    }
}

export default ItemList;