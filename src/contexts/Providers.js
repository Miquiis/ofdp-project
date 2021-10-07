import React from 'react'
import AuthProvider from './AuthContext'
import ChangeUserProvider from './ChangeUserContext'
import CharactersProvider from './CharactersContext'
import DatabaseProvider from './DatabaseContext'
import FichaProvider from './FichaContext'
import RolagemProvider from './RolagemContext'

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <DatabaseProvider>
                <CharactersProvider>
                    <ChangeUserProvider>
                        <FichaProvider>
                            <RolagemProvider>
                                {children}
                            </RolagemProvider>
                        </FichaProvider>
                    </ChangeUserProvider>
                </CharactersProvider>
            </DatabaseProvider>
        </AuthProvider>
    )
}
