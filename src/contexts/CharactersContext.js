import React, { useContext, useState, useEffect } from 'react'
import { useDatabase } from './DatabaseContext'

const CharactersContext = React.createContext()

export function useCharacters() {
    return useContext(CharactersContext)
}

export default function CharactersProvider({ children }) {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)

    const { subscribeCharacters } = useDatabase()

    function getInventoryWeight(id) {
        const ficha = characters.filter(character => character.id === id)[0];
        let weight = 0.0;
        ficha.inventory.items.forEach(item => {
            weight += parseFloat(item.weight);
        })
        return weight;
    }

    useEffect(() => {

        const unsubscribe = subscribeCharacters((characters) => {
            console.log(characters.length)
            setCharacters(characters.map(doc => ({
                id: doc.id,
                ...JSON.parse(doc.get("ficha"))
            })))
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        characters,
        getInventoryWeight
    }

    return (
        <CharactersContext.Provider value={value}>
            {!loading && children}
        </CharactersContext.Provider>
    )
}
