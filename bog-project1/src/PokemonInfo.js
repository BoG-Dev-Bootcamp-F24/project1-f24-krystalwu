import React, { useState, useEffect } from 'react';

function PokemonInfo({ pokemonId = 'ditto' }) {
    const [pokemonData, setPokemonData] = useState(null);
    const [activeTab, setActiveTab] = useState('info'); 
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setPokemonData(data))
            .catch(error => console.error('Error:', error));
    }, [pokemonId]);

    if (!pokemonData) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="image-box">
                <img src={pokemonData.sprites.front_default} alt={pokemonData.name} style={{ width: '200px', height: '200px', objectFit: 'contain' }}/>
            </div>
            <h2>{pokemonData.name.toUpperCase()}</h2>
            
            {activeTab === 'info' && (
                <div>
                    <ul className="stats">
                        {pokemonData.stats.map(stat => (
                            <li key={stat.stat.name}>{`${stat.stat.name}: ${stat.base_stat}`}</li>
                        ))}
                    </ul>
                    <div>
                        {pokemonData.types.map(type => (
                            <span key={type.type.name} className={`type-tag type-${type.type.name}`}>{type.type.name}</span>
                        ))}
                    </div>
                </div>
            )}
            
            {activeTab === 'moves' && (
                <div>
                    <ul className="stats">
                        {pokemonData.moves.map(move => (
                            <li key={move.move.name}>{move.move.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <button className={`button ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Info</button>
                <button className={`button ${activeTab === 'moves' ? 'active' : ''}`} onClick={() => setActiveTab('moves')}>Moves</button>
            </div>
        </div>
    );
}

export default PokemonInfo;
