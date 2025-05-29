// AppNavigator.js
/*
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';


// Import des stacks
import AuthStack from './AuthStack';
import TouristStack from './TouristStack';
import GuideStack from './GuideStack';


// Écran de chargement
import LoadingScreen from '../screens/Common/LoadingScreen';


const Stack = createNativeStackNavigator();


const AppNavigator = () => {
    const { userToken, isLoading, userRole } = useContext(AuthContext);


    console.log('--- AppNavigator RENDER ---');
    console.log('userToken:', userToken ? 'PRESENT' : 'ABSENT');
    console.log('isLoading:', isLoading);
    console.log('userRole:', userRole);
    console.log('---------------------------');


    // Afficher l'écran de chargement pendant la vérification du token
    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken ? (
                    // Utilisateur connecté - Rediriger selon le rôle
                    userRole === 'ROLE_TOURISTE' ? (
                        <>
                            {console.log('Rendering TouristStack')}
                            <Stack.Screen name="TouristApp" component={TouristStack} />
                        </>
                    ) : userRole === 'ROLE_GUIDE' ? (
                        <>
                            {console.log('Rendering GuideStack')}
                            <Stack.Screen name="GuideApp" component={GuideStack} />
                        </>
                    ) : (
                        <>
                            {console.log('Invalid role, rendering AuthStack')}
                            <Stack.Screen name="Auth" component={AuthStack} />
                        </>
                    )
                ) : (
                    <>
                        {console.log('Rendering AuthStack - No token')}
                        <Stack.Screen name="Auth" component={AuthStack} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default AppNavigator;

*/
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import TouristStack from './TouristStack'; // Assurez-vous que le chemin est correct
import GuideStack from './GuideStack';     // Assurez-vous que le chemin est correct
import LoadingScreen from '../screens/Common/LoadingScreen'; // Chemin vers un écran de chargement simple

const AppNav = () => {
    const { userToken, userRole, isLoading } = useContext(AuthContext);

    console.log('AppNavigator Render - Current State:');
    console.log('  userToken:', userToken ? 'PRESENT' : 'ABSENT');
    console.log('  userRole:', userRole);
    console.log('  isLoading:', isLoading);

    if (isLoading) {
        console.log('AppNavigator - Rendering LoadingScreen (isLoading is true)');
        return <LoadingScreen />;
    }

    if (userToken) {
        console.log('AppNavigator - User is authenticated (token present). Role:', userRole);
        if (userRole === 'ROLE_TOURISTE') {
            console.log('AppNavigator - Navigating to TouristStack');
            return <TouristStack />;
        } else if (userRole === 'ROLE_GUIDE') {
            console.log('AppNavigator - Navigating to GuideStack');
            return <GuideStack />;
        } else {
            // Cas d'un rôle inconnu ou manquant malgré un token
            console.log('AppNavigator - Unknown or missing userRole after authentication, navigating to AuthStack.');
            return <AuthStack />;
        }
    } else {
        console.log('AppNavigator - No userToken found, navigating to AuthStack.');
        return <AuthStack />;
    }
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppNav />
        </NavigationContainer>
    );
};

export default AppNavigator;