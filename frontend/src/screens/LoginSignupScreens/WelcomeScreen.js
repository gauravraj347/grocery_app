import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../../../assets/logo.webp';
import { colors, hr80 } from '../../globals/style';
import { firebase } from '../../../Firebase/firebaseConfig';

const WelcomeScreen = ({ navigation }) => {
    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        const checkLogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserLogged(user);
                } else {
                    console.log('No user logged in');
                }
            });
        };
        checkLogin();
    }, []);

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            setUserLogged(null);
            console.log('Signed out successfully');
        }).catch((error) => {
            console.log('Error signing out:', error);
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('home')}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <Text style={styles.title}>
                Welcome to <Text style={styles.boldText}>Groceria</Text>
            </Text>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={hr80} />
            <Text style={styles.text}>Find the best grocery products at the lowest prices.</Text>
            <View style={hr80} />

            {userLogged === null ? (
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Text style={styles.btn}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={styles.btn}>Log In</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.logged}>
                    <Text style={styles.txtLog}>Signed in as <Text style={styles.txtLogin}>{userLogged.email}</Text></Text>
                    <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.btn}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('home')}>
                            <Text style={styles.btn}>Next</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipButton: {
        position: 'absolute',
        top: 2,
        right: 2,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
    },
    skipText: {
        fontSize: 16,
        color: colors.col1,
        fontWeight: '600',
    },
    title: {
        fontSize: 50,
        color: colors.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '200',
    },
    boldText: {
        fontWeight: 'bold',
    },
    logoContainer: {
        width: '80%',
        height: '30%',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        width: '80%',
        color: colors.col1,
        textAlign: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
    },
    btn: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
    },
    logged: {
        alignItems: 'center',
    },
    txtLog: {
        fontSize: 16,
        color: colors.col1,
    },
    txtLogin: {
        fontSize: 16,
        color: colors.col1,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});

export default WelcomeScreen;
