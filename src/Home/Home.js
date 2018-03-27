import React, {Component} from 'react';
import './Home.css'

// import Menu from './Menu/Menu';
import CardsContainer from './CardsContainer/CardsContainer';

class Home extends Component{
    render(){
        return (
            <div className="Home">
                {/* <Menu /> */}
                <CardsContainer />
            </div>    
        );
    }
}

export default Home;