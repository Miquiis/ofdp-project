import React, { useContext } from 'react'
import { firestore } from '../firebase';
import { documentId } from "firebase/firestore"
import { useAuth } from './AuthContext';
import { useCharacters } from './CharactersContext';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

function getDefaultCharacter() {
    const character = {
        basicInfo: {
            name: "Novo Personagem",
            player: "",
            occupancy: "",
            age: "",
            gender: "",
            birth: "",
            residence: ""
        },
        stats: {
            avatarUrl: "",
            health: 10,
            maxHealth: 10,
            majorWound: false,
            unconscious: false,
            dying: false,
            sanity: 20,
            maxSanity: 20,
            tempInsane: false,
            insane: false,
            extraDamage: 0,
            build: 0
        },
        attributes: {
            str: 0,
            con: 0,
            dex: 0,
            app: 0,
            edu: 0,
            int: 0,
            pow: 0,
            luk: 0,
            siz: 0,
            mov: 0
        },
        combat: [
        ],
        skills: [
            {
                id: 1,
                name: "Antropologia (5%)",
                value: 0,
                checked: false
            },
            {
                id: 2,
                name: "Armas de Fogo (Arcos) (25%)",
                value: 0,
                checked: false
            },
            {
                id: 3,
                name: "Armas de Fogo (Eletrico) (30%)",
                value: 0,
                checked: false
            },
            {
                id: 4,
                name: "Armas de Fogo (Pistolas) (30%)",
                value: 0,
                checked: false
            },
            {
                id: 5,
                name: "Armas de Fogo (Rifles/Espingardas) (25%)",
                value: 0,
                checked: false
            },
            {
                id: 6,
                name: "Arqueologia (5%)",
                value: 0,
                checked: false
            },
            {
                id: 7,
                name: "Arremessar (25%)",
                value: 0,
                checked: false
            },
            {
                id: 8,
                name: "Arrombar (5%)",
                value: 0,
                checked: false
            },
            {
                id: 9,
                name: "Arte e Oficio (10%)",
                value: 0,
                checked: false
            },
            {
                id: 10,
                name: "Avaliacao (10%)",
                value: 0,
                checked: false
            },
            {
                id: 11,
                name: "Charme (20%)",
                value: 0,
                checked: false
            },
            {
                id: 12,
                name: "Chaveiro (5%)",
                value: 0,
                checked: false
            },
            {
                id: 13,
                name: "Ciencia (5%)",
                value: 0,
                checked: false
            },
            {
                id: 14,
                name: "Ciencia Biologia (0%)",
                value: 0,
                checked: false
            },
            {
                id: 15,
                name: "Ciencia Forense (0%)",
                value: 0,
                checked: false
            },
            {
                id: 16,
                name: "Consertos Elet. (15%)",
                value: 0,
                checked: false
            },
            {
                id: 17,
                name: "Consertos Mec. (15%)",
                value: 0,
                checked: false
            },
            {
                id: 18,
                name: "Contabilidade (10%)",
                value: 0,
                checked: false
            },
            {
                id: 19,
                name: "Direito (10%)",
                value: 0,
                checked: false
            },
            {
                id: 20,
                name: "Dirigir (25%)",
                value: 0,
                checked: false
            },
            {
                id: 21,
                name: "Disfarce (10%)",
                value: 0,
                checked: false
            },
            {
                id: 22,
                name: "Eletronica (5%)",
                value: 0,
                checked: false
            },
            {
                id: 23,
                name: "Encontrar (30%)",
                value: 0,
                checked: false
            },
            {
                id: 24,
                name: "Escalar (25%)",
                value: 0,
                checked: false
            },
            {
                id: 25,
                name: "Escutar (25%)",
                value: 0,
                checked: false
            },
            {
                id: 26,
                name: "Esquivar",
                value: 0,
                checked: false
            },
            {
                id: 27,
                name: "Explosivos (5%)",
                value: 0,
                checked: false
            },
            {
                id: 28,
                name: "Furtividade (25%)",
                value: 0,
                checked: false
            },
            {
                id: 29,
                name: "Historia (25%)",
                value: 0,
                checked: false
            },
            {
                id: 30,
                name: "Intimidacao (20%)",
                value: 0,
                checked: false
            },
            {
                id: 31,
                name: "Labia (10%)",
                value: 0,
                checked: false
            },
            {
                id: 32,
                name: "Luta/Briga (30%)",
                value: 0,
                checked: false
            },
            {
                id: 33,
                name: "Linguagem (EDU)",
                value: 0,
                checked: false
            },
            {
                id: 34,
                name: "Linguagem (Outros) (5%)",
                value: 0,
                checked: false
            },
            {
                id: 35,
                name: "Primeiros Socorros (35%)",
                value: 0,
                checked: false
            },
            {
                id: 36,
                name: "Maos Rapidas (15%)",
                value: 0,
                checked: false
            },
            {
                id: 37,
                name: "Medicina (5%)",
                value: 0,
                checked: false
            },
            {
                id: 38,
                name: "Sobrevivencia (15%)",
                value: 0,
                checked: false
            },
            {
                id: 39,
                name: "Psicanalise (5%)",
                value: 0,
                checked: false
            }
        ],
        inventory: {
            money: 0,
            items: [
            ]
        }
    };
    return character;
}

export default function DatabaseProvider({ children }) {

    const { currentUser, userProfile } = useAuth()
    const { characters } = userProfile;

    async function createCharacter() {
        if (currentUser == null || userProfile == null) return;

        const charRef = firestore.collection(`characters`);

        try {
            const character = getDefaultCharacter();
            const charSnap = await charRef.add({ ficha: JSON.stringify(character) });
            return { id: charSnap.id, ...character};
        } catch (error) {
            console.log('Error creating user', error.message);
        }

        return null;
    }

    async function saveCharacter(character) {
        if (currentUser == null || userProfile == null) return;
        const charRef = firestore.doc(`characters/${character.id}`);
        return await updateDoc(charRef, {
            ficha: JSON.stringify(character)
        })
    }

    async function deleteCharacter(character) {
        if (currentUser == null || userProfile == null) return;
        const charRef = firestore.doc(`characters/${character.id}`);
        await charRef.delete()
    }

    async function removeCharacterFromUser(userUid, characterUid) {
        const userRef = firestore.doc(`users/${userUid}`);
        const snapshot = await userRef.get();

        if (snapshot.exists) {
            let characters = JSON.parse(snapshot.get("characters"));
            characters = characters.filter(character => character !== characterUid);
            await updateDoc(userRef, {
                characters: JSON.stringify(characters)
            })
        }
    }

    async function addCharacterToUser(userUid, characterUid) {
        const userRef = firestore.doc(`users/${userUid}`);
        const snapshot = await userRef.get();

        if (snapshot.exists) {
            let characters = JSON.parse(snapshot.get("characters"));
            if (characters.contains(characterUid)) return;
            characters.push(characterUid);
            await updateDoc(userRef, {
                characters: JSON.stringify(characters)
            })
        }
    }

    async function fetchUserByName(username) {
        if (!username) return;

        let foundUser = null;

        await firestore.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.get("username") === username) {
                    foundUser = {
                        id: doc.id,
                        username: doc.get("username"),
                        email: doc.get("email")
                    }
                }
            })
        })

        return foundUser;
    }

    async function fetchUsersByCharacter(characterUid) {
        if (!characterUid) return;

        const foundUsers = [];

        await firestore.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const characters = JSON.parse(doc.get("characters"));
                if (characters.includes(characterUid)) {
                    foundUsers.push({
                        id: doc.id,
                        username: doc.get("username"),
                        email: doc.get("email")
                    })
                }
            })
        })

        return foundUsers;
    }

    async function fetchCharacter(uid) {
        if (!uid) return;

        const charRef = firestore.doc(`characters/${uid}`);
        const snapshot = await charRef.get();

        if (snapshot.exists) {
            return {id: snapshot.id, ...JSON.parse(snapshot.get("ficha"))}
        }

        return null;
    }

    async function fetchCharacters() {
        let Characters = [];

        if (userProfile.role === 9) {
            await firestore.collection("characters").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    Characters.push({ id: doc.id, ...JSON.parse(doc.get("ficha")) })
                })
            })
        } else {
            if (characters == null || characters.length === 0) return Characters;
            await firestore.collection("characters").where(documentId(),'in', characters).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    Characters.push({ id: doc.id, ...JSON.parse(doc.get("ficha")) })
                })
            })
        }

        return Characters;
    }

    function subscribeCharacters(update) {
        let q = null;

        if (userProfile.role === 9) {
            q = query(collection(firestore, "characters"));
        } else {
            if (characters.length < 1) return Function();
            q = query(collection(firestore, "characters"), where(documentId(), 'in', characters));
        }

        return onSnapshot(q, (querySnapshot) => {
            const characters = [];
            querySnapshot.forEach((doc) => {
                characters.push(doc)
            })
            update(characters)
        })
    }

    const value = {
        fetchCharacter,
        createCharacter,
        deleteCharacter,
        saveCharacter,
        fetchCharacters,
        fetchUserByName,
        addCharacterToUser,
        removeCharacterFromUser,
        subscribeCharacters,
        fetchUsersByCharacter
    }

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}
