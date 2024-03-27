import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3defa'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#e9b3fc',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#e9b3fc',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfoheader: {
    fontWeight:'bold',
    backgroundColor: '#f5edf7',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  gameinfo: {
    
    backgroundColor: '#f5edf7',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    fontWeight:'bold',
    margin: 30,
    marginHorizontal: 125, 
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#cf8ee6",
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonText: {
    
    color:"#2B2B52",
    fontSize: 20
  },
  text: {
    textAlign: 'center',
    fontWeight:'bold',
  },


});