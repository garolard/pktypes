import * as React from 'react';
import { useState } from 'react';

import Pokedex, { PokedexEntry } from '../../pokedex';
import { hashCode, padWithZero } from '../util';
import { ResultType } from '../controls/Result';

import './PokedexTab.css';
import './PokedexTab.small.css';
import { stringToType } from '../../calculator';

type Props = {
  onPokemonSelected: (pokemon: PokedexEntry) => void;
};

function buildPokemonList(pokes: PokedexEntry[], onPokemonSelected: (pokemon: PokedexEntry) => void) {
  return pokes.map(p => {
    let key = p.id.toString();

    for (let i = 0; i < p.type.length; i++) {
      key += hashCode(p.type[i]);
    }

    const types = p.type.map(t => <ResultType key={hashCode(t)} type={stringToType(t)} small />);

    return (
      <li key={key} onClick={() => onPokemonSelected(p)}>
        <span><em>#{padWithZero(p.id)}</em> <strong>{p.name}</strong></span>
        <div>
          {types}
        </div>
      </li>
    );
  });
}

export const PokedexTab: React.FC<Props> = ({ onPokemonSelected }: Props) => {

  const [results, setResults] = useState(Pokedex);

  const searchPokemon = (ev: any) => {
    const value = ev.target.value;
    const res = Pokedex.filter(p => p.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    setResults(res);
  }

  return (
    <div className='poke-list-container'>
      <span className='poke-search-input-wrapper'>
        <input className='poke-search-input' onChange={searchPokemon} placeholder='Pikachu...' />
      </span>
      <ul className='poke-list'>
        {buildPokemonList(results, onPokemonSelected)}
      </ul>
    </div>
  );
}