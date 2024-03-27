import { useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import style from '../style/style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS } from '../constants/Game';


export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
    if (value.trim().length > 0){
        setHasPlayerName(true);
        Keyboard.dismiss
    }
    }
 
    return (
        <>
        <Header />
        <View>
            {!hasPlayerName ? 
            <>
                <Text style={style.text}>For scoreboard enter your name...</Text>
                <TextInput style={style.buttonText}
                onChangeText={setPlayerName} autoFocus={true}></TextInput>
                <Pressable style={style.button}
                onPress={() => handlePlayerName(playerName)}>
                    <Text>OK</Text>
                </Pressable>
            </>
            
            :
            <>
                <Text style={style.gameinfoheader}>Rules of the game</Text>
                <Text multiline='true' style={style.gameinfo}>
                THE GAME: You have {NBR_OF_DICES} dices and 
                for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in 
                order to get same dice spot counts as many as 
                possible. In the end of the turn you must select 
                your points from {MIN_SPOT} to {MAX_SPOT}. 
                Game ends when all points have been selected. 
                The order for selecting those is free.
                </Text>
                
                <Text style={style.gameinfo}>Good luck, {playerName}</Text>
                <Pressable 
                onPress={() => navigation.navigate(
                    'Gameboard', {player: playerName} )} >
                <Text style={style.button}>PLAY</Text>
                </Pressable>
            </>
            }
        </View>
        <Footer />
        </>
    );
}