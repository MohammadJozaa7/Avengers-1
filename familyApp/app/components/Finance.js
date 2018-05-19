//import react from react
import React from 'react';
//import element from reacr-native
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
//import table from react native table component
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import axios to make router works
import axios from 'axios';
//import Dialog from react native dialog
import Dialog from "react-native-dialog";
//import Bar from Bar component
import Bar from './Bar';

//export Home from the react componant
export default class Finance extends React.Component{
  //the constructor
  constructor(){
    //super for ES6
    super();
    //all the data save before to can show in the bar
    this.state={
      tableHead:  ['Name', 'Cost'],
      tableName: [['Water'], ['Electricity'], ['Shortage'], ['Family Event'],['water of the month']],
      tableCost:  [[12],     [30],            [40],         [150]    ,[999.99]],
      tableTotal:['Total',0],
      //for show Dialog Add
      addDialogVisible: false,
      addName:'',
      addEditCost:'',
      editDialogVisible: false,
      editCost:'',

    };
    //auto call function when render this scren
    this.calculateTotalMoney();
  }
  calculateTotalMoney(){
    var total=0;
    for (var i = 0; i < this.state.tableCost.length; i++) {
      total+=this.state.tableCost[i][0];
    }
    //cant use set state so we use this .state
    this.state.tableTotal[1]=total;
    // this.setState({tableTotal : ['Total',total]});
  }
  handleCancelAdd(){
    this.setState({ addDialogVisible: false });
  };
  handleAdd(){
    alert('Done Add: '+this.state.addName +' with cost: ' + this.state.addEditCost);
    this.setState({ addDialogVisible: false });
  };
  addToFinance(){
    //alert('Add To Finance');
    this.setState({ addDialogVisible: true });
  };
  onAddName(name){
    if(name.length>0){
      name=name[0].toUpperCase()+name.slice(1,name.length)
    }
    this.setState({addName: name})
  }
  onAddEditCost(value) {
    //all this function to be sure the input is a valid number
    let newNumber = '';
    let numbers = '0123456789.';
    for (var i = 0; i < value.length; i++) {
        if ( numbers.indexOf(value[i]) > -1 ) {
          if (newNumber.split('.').length<=1 || value[i]!=='.' ) {
            if (newNumber.length>0 || value[i]!=='.') {
               newNumber = newNumber + value[i];
            }
          }  
        }
    }
    if (newNumber.length>(newNumber.indexOf('.')+3) && newNumber.indexOf('.')!==-1 ) {
      newNumber=newNumber.slice(0,(newNumber.indexOf('.')+3))
    }
    this.setState({addEditCost: newNumber})
  }
  handleCancelEdit(){
    this.setState({ editDialogVisible: false });
  };
  handleEdit(){
    this.setState({ editDialogVisible: false });
  };
  editFromFinance(){
    this.setState({ editDialogVisible: true });
  };





  deleteFromFinance(){
    alert('delete From Finance');
  };

  render() {
    //what return
    return (
      <View style={styles.allPage}>
      <Bar navigation={this.props.navigation}/>
        <View style={styles.tableView}>
          <Table style={styles.table}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textHead} flexArr={[2, 1.3]}/>
            <TableWrapper style={styles.wrapper} >
              <Rows data={this.state.tableName} style={styles.name} textStyle={styles.textName} flexArr={[2]}/>
              <Rows data={this.state.tableCost} style={styles.cost} textStyle={styles.textCost} flexArr={[1.3]}/>
            </TableWrapper>
            <Row data={this.state.tableTotal} style={styles.total} textStyle={styles.textTotal} flexArr={[2,1.3]}/>
          </Table>
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnAdd} onPress={this.addToFinance.bind(this)}>
            <Text style={styles.textBtnAdd}>Add</Text>
          </TouchableOpacity>

          <Dialog.Container visible={this.state.addDialogVisible}>
            <Dialog.Title style={styles.textDialogTitle}>Add To Finance</Dialog.Title>
            <Dialog.Description>
              Insert the name and cost please
            </Dialog.Description>
            <View style={styles.textInputDialogView}>
              <TextInput placeholder='Name' value={this.state.addName} style={styles.textInput} maxLength={17}
              onChangeText={(name)=> this.onAddName(name)} value={this.state.addName}></TextInput>
              <TextInput placeholder='Cost' style={styles.textInput} maxLength={6} keyboardType='numeric' 
              onChangeText={(value)=> this.onAddEditCost(value)} value={this.state.addEditCost} ></TextInput>
            </View>
            <View style={styles.btnDialogView}>
              <Dialog.Button style={styles.btnDialogCancel} label="Cancel" onPress={this.handleCancelAdd.bind(this)}/>
              <Dialog.Button style={styles.btnDialogAdd} label="Add" onPress={this.handleAdd.bind(this)}  />
            </View>
          </Dialog.Container>

          <TouchableOpacity style={styles.btnEdit} onPress={this.editFromFinance.bind(this)}>
            <Text style={styles.textBtnEdit}>Edit</Text>
          </TouchableOpacity>

           <Dialog.Container visible={this.state.editDialogVisible}>
            <Dialog.Title style={styles.textDialogTitle}>Edit From Finance</Dialog.Title>
            <Dialog.Description>
              Choose the name then insert the cost  
            </Dialog.Description>
            <View style={styles.textInputDialogView}>
          

              <TextInput placeholder='Cost' style={styles.textInput} maxLength={6} keyboardType='numeric' 
              onChangeText={(value)=> this.onAddEditCost(value)} value={this.state.editCost} ></TextInput>
            </View>
            <View style={styles.btnDialogView}>
              <Dialog.Button style={styles.btnDialogCancel} label="Cancel" onPress={this.handleCancelEdit.bind(this)}/>
              <Dialog.Button style={styles.btnDialogEdit} label="Edit" onPress={this.handleEdit.bind(this)}  />
            </View>
          </Dialog.Container>

          <TouchableOpacity style={styles.btnDelete} onPress={this.deleteFromFinance.bind(this)}>
            <Text style={styles.textBtnDelete}>Delete</Text>
          </TouchableOpacity>
     
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2896d3',
    //marginBottom:35,
  },
  tableView: {
    flexDirection: 'column',
    backgroundColor: '#2896d3',
    // backgroundColor: '#0bf5fb',
  },
  table: {
    backgroundColor: '#6239BD',
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
  },
  wrapper: {
    flexDirection: 'row',
  },
  head: {
    height: 50,
    backgroundColor: '#123456',
  },
  textHead:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    color:'#3cff00',
  },
  name: {
     // backgroundColor: '#6239BD'
  },
  textName:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    color:'white',
  },
  cost: {
    // backgroundColor: '#6239BD',
  },
  textCost:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    color:'white',
  },
  total:{
    height: 40,
    backgroundColor: '#123456',
  },
  textTotal:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'red',
  },
  btnView: {
    backgroundColor: '#2896d3',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  btnAdd:{
    backgroundColor: '#3cff00',
    marginTop:10,
    padding:10,
  },
  textBtnAdd:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  btnEdit:{
    backgroundColor: '#6239BD',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnEdit:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  btnDelete:{
    backgroundColor: 'red',
    marginTop:10,
    padding:10,
    marginLeft:10,
  },
  textBtnDelete:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  btnDialogView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  btnDialogCancel: {
    fontSize: 20,
    color:'black',
    fontWeight: 'bold',

  },
  btnDialogAdd: {
    fontSize: 20,
    color:'#3cff00',//green
    fontWeight: 'bold',
  },
  btnDialogEdit: {
    fontSize: 20,
    color:'#6239BD',//purple
    fontWeight: 'bold',
  },
  btnDialogDelete: {
    fontSize: 20,
    color:'red',//purple
    fontWeight: 'bold',
  },
  
  textDialogTitle:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    color:'black',
  },
  textInputDialogView: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
  },

 

 
});


/*
  fectch1(){
    //return axios.get('http://192.168.1.82:3000')
    return fetch('http://192.168.1.82:3000')
      .then((response) => response.json())
        .then((responseJson) => {
          console.log("server done:",JSON.stringify(responseJson) )
           alert(JSON.stringify(responseJson));
        })
      .catch(function (error) {
       console.log(error);
      });
  }





// untill now I didint use it
// import HTML from react native render html to render html elemnt
import HTML from 'react-native-render-html';
// Dialog Component from react native dialog component to render pop elemnt
import { DialogComponent, SlideAnimation } from 'react-native-dialog-component';


*/
