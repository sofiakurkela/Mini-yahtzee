import { useEffect, useState } from "react";
import { View, Text, Pressable} from "react-native";
import style from '../style/style';
import Header from "./Header";
import Footer from "./Footer";
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS } from '../constants/Game';
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


let board = [];

export default Gameboard = ({ navigation, route }) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    

// are dices selected or not?
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));
        
    
// dice spots (1,2,3,4,5,6) for each dice   
        const [diceSpots, setDiceSpots] = 
    useState(new Array(NBR_OF_DICES).fill(0));
    
// are dice points selected or not?
    const [selectedDicePoints, setSelectedDicePoints] = 
    useState(new Array(MAX_SPOT).fill(false));

//
    const [dicePointsTotal, setDicePointsTotal] =
    useState(new Array(MAX_SPOT).fill(0));


    // this one is passing the playername
    useEffect(() => {
        if (playerName ==='' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    // this useEffect is for reading scoreboard from AsynsStorage when user is  navigating back to screen (look at the assignment istructions) 
    // trigger here navigation for useEffect

    // this useEffect is for handling the gameflow so the game does not stop too early or does not continue after it should not
    // trigger here is nbrOfThrowsLeft as a trigger is to avoid "one step behind" problem

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
        <Col key={"dice" + dice}>
      <Pressable 
          key={"dice" + dice}
          onPress={() => selectDice(dice)}
          >
        <MaterialCommunityIcons
          name={board[dice]}
          key={"dice" + dice}
          size={50} 
          color={getDiceColor(dice)}
          >
        </MaterialCommunityIcons>
      </Pressable>
      </Col>
    );
  }


  // call the function for calculating points inside text component
  // for replacing zero
const pointsRow = [];
for (let spot = 0; spot < MAX_SPOT; spot++) {
  pointsRow.push(
    <Col key={"pointsRow" + spot}>
      <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}
      
      </Text>
    </Col>
  )
}

const pointsToSelectRow = [];
for(let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
  pointsToSelectRow.push(
    <Col key={"buttonsRow" + diceButton}> 
      <Pressable
        key={"buttonsRow" + diceButton}
        onPress={() => selectDicePoints(diceButton)}>

        <MaterialCommunityIcons
        name={"numeric-" + (diceButton + 1) + "-circle"}
        key={"buttonsrow"+ diceButton}
        size={35}
        color={getDicePointsColor(diceButton)}
        // pressable here
        >

        </MaterialCommunityIcons>
      </Pressable>
    </Col>
  )
}

  function getDicePointsColor(i) {
    return(selectedDicePoints[i] && !gameEndStatus) 
    ? "black" : "steelblue";
  }

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }
   else {
    setStatus("You have to throw dices first");
   }
}

function getDiceColor(i) {
  return selectedDices[i] ? "black" : "steelblue";
}

const throwDices = () => {

  // 2.osa
  if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
    setStatus('Select your points before next throw');
    return 1;
  }
  else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
    setGameEndStatus(false);
    diceSpots.fill(0);
    dicePointsTotal.fill(0);
  } 
  // ------------------ 1. osa
  let spots = [...diceSpots];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    if (!selectedDices[i]) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
      spots[i] = randomNumber;
    }
  }
  setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
  setDiceSpots(spots);
  setStatus('Select and throw dices again.');
}

  const selectDicePoints = (i) => {
    // very first version
    let selectedPoints = [...selectDicePoints];
    let points = [...dicePointsTotal];
    selectedPoints[i] = true;
    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
    points[i] = nbrOfDices * (i + 1);
    setDicePointsTotal(points);
    setSelectedDicePoints(selectedPoints);
    return points[i];
  }


    return (
        <>
        <Header/>
        <View>
            <Text>
                Gameboard will be here...
            </Text>
        <Container fluid>
            <Row>{dicesRow}</Row>
        </Container>
        <Container fluid>
            <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
            <Row>{pointsToSelectRow}</Row>
        </Container>
        <Pressable 
        onPress={() => throwDices()}>
            <Text>THROW DICES</Text>
        </Pressable>
        <Text>Player: {playerName}</Text>
        </View>
        <Footer />
        </>
    )
}