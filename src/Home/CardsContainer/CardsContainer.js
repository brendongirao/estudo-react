import React, {Component} from 'react';
import './CardsContainer.css';

import axios from 'axios';

import Card from '../Card/Card';

class cardscontainer extends Component{

    aux = [];

    state = {
        showAddCard: false,
        cards: []
    }

    showAddCardHandler = () => {
        this.setState({
            showAddCard: true
        })
    }

    AddCardHandler = (titleCard) => {
        // this.aux.push({title: titleCard});
        // this.setState({
        //     showAddCard: false,
        //     cards: this.aux
        // })
        axios.post('http://rest.learncode.academy/api/brendon/react', {
            title: titleCard,
            cardItens: []
        }).then(response => {
            // console.log(response)
            this.setState({showAddCard: false});
            this.updateCardsFromServer();
        }).catch(error=>{
            console.log(error)
        })
        document.getElementById("titleCard").value="";
    }

    deleteCard = (index) => {
        console.log(index);
        //PREFERIVEL USAR O SLICE() POIS O JS GUARDA UMA REFERENCIA PARA O ARRAY ORIGINAL
        //NÃO ELE MESMO, PORTANTO EXLUIR DIRETO DO ARRAY ORIGINAL PODE SER UM PROBLEMA NO FUTURO E É UMA MA PRATICA
        // const cards = this.state.cards.slice();
        // SPREAD: FAZ O MESMO DA LINHA ACIMA
        // const cards = [...this.state.cards];
        // cards.splice(index, 1);
        // this.setState({cards: cards});
        axios.delete('http://rest.learncode.academy/api/brendon/react/'+index)
            .then(response=>{
                this.updateCardsFromServer();
            });
    }

    updateCardsFromServer(){
        axios.get('http://rest.learncode.academy/api/brendon/react')
            .then(response =>{
                this.setState({cards: response.data});
                console.log(response)
            });
    }

    componentDidMount(){
        this.updateCardsFromServer();
        // axios.post('http://rest.learncode.academy/api/brendon/react', {
        //     title: 'titulo'
        // }).then(response => {
        //     console.log(response)
        // }).catch(error=>{
        //     console.log(error)
        // })
    }

    render(){
        // const showAddCard = {
        //     'display':this.state.showAddCard ? 'block' : 'none'
        // };

        // SEMPRE QUE HOUVER UMA MUDANÇA O REACT VAI EXECUTAR NOVAMENTE TUDO QUE ESTAR DENTRO DO METODO RENDER 
        // PORTANTO ESSA É A MELHOR MANEIRA DE MOSTRAR OU ESCONDER COMPONENTES
        let addCardForm = null;
        if(this.state.showAddCard){
            addCardForm = (
                <div className="NewCard">
                    <input type="text" className="NewCardInput" id="titleCard"/>
                    <div className="Card-button" onClick={()=>this.AddCardHandler(document.getElementById("titleCard").value)}>Adicionar</div>
                </div> 
            )
        }
        return (
            <div className="CardsContainer">
                {/* <Card /> */}
                <div className="AddCard">
                    <span className="add" onClick={this.showAddCardHandler}>+</span>
                </div>

                {/* ADICIONA OS CARDS DINAMICAMENE PARA CADA ELEMENTO DA LISTA CARDS NO STATE, A FUNÇÃO MAP DEVE RECEBER
                UM PARAMETRO QUE É O ITEM ATUAL E O INDEX QUE DEVE SER PASSADO COMO A PROPRIEDADE KEY PARA O COMPONENTE  */}
                {this.state.cards.map((item, i) => <Card key={item.id} title={item.title} id={item.id} cardItens={item.cardItens} click={()=>this.deleteCard(item.id)}/> )}
                
                {/* MANEIRA ORGANIZADA DE FAZER */}
                {addCardForm}

                {/* MANEIRA BAGUNÇADA DE FAZER */}
                {/* {
                    this.state.showAddCard ?
                    <div className="NewCard">
                        <input type="text" className="NewCardInput" id="titleCard"/>
                        <div className="Card-button" onClick={()=>this.AddCardHandler(document.getElementById("titleCard").value)}>Adicionar</div>
                    </div> : null
                } */}
            </div>
        )
    }
}

export default cardscontainer;