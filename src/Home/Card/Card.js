import React, {Component} from 'react';
import './Card.css';
import axios from 'axios';

import CardItem from './CardItem/CardItem';

class card extends Component {

    aux = [];
    state = {
        cardItens: [],
        inputValue: ''
    }

    AddCardItemHandler = (cardid, title, carditens) => {
        this.aux = [...carditens];
        this.aux.push({title: this.state.inputValue});
        this.setState({
            cardItens: this.aux,
            inputValue: ''
        });
        const cardUpdated = {
            title: title,
            cardItens: this.aux,
            id: cardid
        }
        axios.put('http://rest.learncode.academy/api/brendon/react/'+cardid, cardUpdated)
        console.log(carditens);
    }

    updateInputValue = (evt) =>{
        this.setState({
            inputValue: evt.target.value
        });
    }

    click(keyitem){
        console.log(keyitem)
    }

    componentDidMount(){
        this.setState({cardItens: this.props.cardItens});
    }
    
    render(){
        return (
            <div className="Card" id="card">
                <div className="delete" onClick={this.props.click}>Excluir</div>
                <h1 className="Card-title">{this.props.title}</h1>
                {/* <CardItem title={this.state.cardItens[0].title}/>
                <CardItem title={this.state.cardItens[1].title}/>
                <CardItem title={this.state.cardItens[2].title}/> */}
                {this.state.cardItens.map((item, i)=> <CardItem key={i} title = {item.title}/> )}
                <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} className="Card-input" type="text" id="input"/>
                <div className="Card-button" onClick={()=>this.AddCardItemHandler(this.props.id, this.props.title, this.state.cardItens)}>Adicionar</div> 
                {/* <div className="Card-button" onClick={()=>this.AddCardItemHandler(document.getElementById("input").value)}>Adicionar</div> */}
                 {/* <div className="Card-button" onClick={evt => this.updateInputValue(evt)}>Adicionar</div>  */}
            </div>
        )
    }

}

export default card;