//import { render } from '@testing-library/react';
import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      pokeReveal: false,
      timer: 10,
      timerOn: false,
      timerInterval: null,
    }
  }

  startTimer() {
    clearInterval(this.state.timerInterval)
    this.fetchPokemon()
    this.setState({
      timerOn: true,
      timer: 10,
      pokeReveal: false,
    })
    this.setState({
      timerInterval: setInterval(() => {
        if (this.state.timer > 0) {
          this.setState({
            timer: this.state.timer - 1,
          })
        } else {
          this.setState({
            pokeReveal: true
          })
          this.setState({
            timerOn: false,
          })

        }
      }, 1000)
      })
  }


fetchPokemon() {
  let min = Math.ceil(1);
  let max = Math.floor(152);
  let pokeNum = Math.floor(Math.random() * (max - min) + min);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
    method: 'GET'
  }).then(res => res.json())
    .then(res => {
      this.setState({
        pokeInfo: res,
        pokeSprite: res.sprites.front_default,
        pokeName: res.species.name,
      })
    })
    .catch((err) => console.log(err))
}




render() {
  return (
    <div className={'wrapper'}>
      <button onClick= {() => this.startTimer()}
      className={'start'}>Start!</button>
      <h2 className={'timer'}> Timer Display: {this.state.timer}</h2>  
      <div className={'pokeWrap'}>
        <img className={this.state.pokeReveal ? 'pokeImg' : 'hidePokeImg'} src={this.state.pokeSprite} />
        <h3 className={this.state.pokeReveal ? 'pokeName' : 'hidePoke' }> {this.state.pokeName}</h3>
        </div> 
         </div>
    )
  }
}


export default PokeFetch;