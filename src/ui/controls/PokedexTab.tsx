import * as React from 'react';
import { useState } from 'react';

import Pokedex, { PokedexEntry } from '../../pokedex';
import { hashCode } from '../util';

type Props = {
  onPokemonSelected: (pokemon: PokedexEntry) => void;
};

function buildPokemonList(pokes: PokedexEntry[], onPokemonSelected: (pokemon: PokedexEntry) => void) {
  return pokes.map(p => {
    let key = p.id.toString();

    for (let i = 0; i < p.type.length; i++) {
      key += hashCode(p.type[i]);
    }

    return <li key={key} onClick={() => onPokemonSelected(p)}>{p.name}</li>
  });
}

export const PokedexTab: React.FC<Props> = ({ onPokemonSelected }: Props) => {

  const [results, setResults] = useState([] as PokedexEntry[]);

  const searchPokemon = (ev: any) => {
    const value = ev.target.value;
    const res = Pokedex.filter(p => p.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    setResults(res);
  }

  return (
    <>
      <input onChange={searchPokemon} />
      <ul>
        {buildPokemonList(results, onPokemonSelected)}
      </ul>
    </>
  );
}