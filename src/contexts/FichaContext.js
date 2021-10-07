import React, { useContext, useState, useEffect, useRef } from 'react'
import { useDatabase } from './DatabaseContext';

const FichaContext = React.createContext()

export function useFicha() {
    return useContext(FichaContext)
}

function getMissingNo(a, n) {
    let total = Math.floor((n + 1) * (n + 2) / 2);
    for (let i = 0; i < n; i++)
        total -= a[i];
    return total;
}

function getNextCombatId(combat) {
    const combatIds = combat.map(combat => combat.id)
    return getMissingNo(combatIds, combatIds.length)
}

export default function FichaProvider({ children }) {
    const [ficha, setFicha] = useState()
    const [loading, setLoading] = useState(true)
    const [startFicha, setStartFicha] = useState();
    const { saveCharacter } = useDatabase()

    function openFicha(ficha) {
        setStartFicha(JSON.parse(JSON.stringify(ficha)))
        setFicha(
            ficha
        )
    }

    function saveFicha() {
        if (JSON.stringify(startFicha) === JSON.stringify(ficha)) {
            return;
        }
        saveCharacter(ficha)
        setStartFicha(JSON.parse(JSON.stringify(ficha)))
    }

    function deleteFicha(character) {
        if (JSON.stringify(character) !== JSON.stringify(ficha)) 
        {
            return;
        }
        setFicha()
        setStartFicha()
    }

    function updateFicha(ficha) {
        setFicha(prev => ({
            ...prev,
            ...ficha
        }))
    }

    function getInventoryWeight() {
        let weight = 0.0;
        ficha.inventory.items.forEach(item => {
            weight += parseFloat(item.weight);
        })
        return weight;
    }

    function addBlankItem() {
        const _item = {
            id: getNextCombatId(ficha.inventory.items),
            name: "",
            weight: 0.0
        }
        addItem(_item)
    }

    function addItem(_item) {
        ficha.inventory.items.push(_item);
        updateFicha(ficha)
    }

    function removeItemById(id) {
        const _items = ficha.inventory.items.filter(v => v.id !== id);
        ficha.inventory.items = _items
        updateFicha(ficha)
    }

    function getItemById(id) {
        return ficha.inventory.items.filter(v => v.id === id);
    }

    function addBlankCombat() {
        const _combat = {
            id: getNextCombatId(ficha.combat),
            name: "",
            type: "",
            damage: "",
            ammo: "",
            maxAmmo: "",
            attacks: "",
            range: "",
            defect: "",
            area: ""
        }
        addCombat(_combat)
    }

    function addCombat(_combat) {
        ficha.combat.push(_combat);
        updateFicha(ficha)
    }

    function getCombatById(id) {
        return ficha.combat.filter(v => v.id === id);
    }

    function removeCombatById(id) {
        const _combat = ficha.combat.filter(v => v.id !== id);
        ficha.combat = _combat;
        updateFicha(ficha)
    }

    function getSkillById(id) {
        return ficha.skills.filter(v => v.id === id);
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    const value = {
        ficha,
        startFicha,
        deleteFicha,
        saveFicha,
        openFicha,
        getInventoryWeight,
        addBlankItem,
        addItem,
        removeItemById,
        getItemById,
        updateFicha,
        getCombatById,
        addCombat,
        addBlankCombat,
        removeCombatById,
        getSkillById
    }

    return (
        <FichaContext.Provider value={value}>
            {!loading && children}
        </FichaContext.Provider>
    )
}
