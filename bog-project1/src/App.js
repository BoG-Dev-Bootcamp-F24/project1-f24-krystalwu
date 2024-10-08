import React, { useState } from 'react';
import './App.css';
import PokemonInfo from './PokemonInfo';

function App() {
    const [pokemonId, setPokemonId] = useState(1);

    const handleNextPokemon = () => {
        setPokemonId(prevId => prevId + 1);
    };

    const handlePrevPokemon = () => {
        setPokemonId(prevId => Math.max(1, prevId - 1));
    };

    return (
        <div className="App">
            <header className="App-header">
                <PokemonInfo 
                    pokemonId={pokemonId}
                    onNext={handleNextPokemon}
                    onPrevious={handlePrevPokemon}
                />
            </header>
        </div>
    );
}

export default App;
