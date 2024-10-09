import React, { useState, useEffect } from 'react';

function PokemonInfo({ pokemonId, onNext, onPrevious }) {
    const [pokemonData, setPokemonData] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = {
                    ...data,
                    height: data.height / 10, // Convert to meters
                    weight: data.weight / 10, // Convert to kilograms
                    stats: data.stats
                };
                setPokemonData(formattedData);
            })
            .catch(error => console.error('Error:', error));
    }, [pokemonId]);

    if (!pokemonData) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className='header'>Bits of Good Mid-Semester Project</div>
            <div className='content'>
                <div className="left-panel">
                    <div className="image-box">
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}/>
                    </div>
                    <div className="pokemon-name">
                        {pokemonData.name.toLowerCase()}
                    </div>
                    <div className='types-header'>Types:</div>
                    <div className='type-tags'>
                        {pokemonData.types.map(type => (
                            <span key={type.type.name} className={`type-tag type-${type.type.name}`}>{type.type.name}</span>
                            ))}
                    </div>
                    <div className="navigation">
                        <button className="nav-button" onClick={onPrevious}>{"<"}</button>
                        <button className="nav-button" onClick={onNext}>{">"}</button>
                    </div>
                </div>
                <div className="right-panel">
                    {activeTab === 'info' && (
                        <>
                            <div className='info-title'>Info</div> 
                            <div className="info-content">
                                <ul className="stats">
                                    <li>height: {pokemonData.height} m</li>
                                    <li>weight: {pokemonData.weight} kg</li>
                                    {pokemonData.stats.map(stat => (
                                        <li key={stat.stat.name}>{`${stat.stat.name}: ${stat.base_stat}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                    {activeTab === 'moves' && (
                        <>
                            <div className='moves-title'>Moves</div> 
                            <div className="moves-content">
                                <ul className="stats">
                                    {pokemonData.moves.map(move => (
                                        <li key={move.move.name}>{move.move.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                    <div className="buttons">
                        <button className={`button ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Info</button>
                        <button className={`button ${activeTab === 'moves' ? 'active' : ''}`} onClick={() => setActiveTab('moves')}>Moves</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonInfo;
