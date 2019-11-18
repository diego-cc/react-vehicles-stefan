// this is the tutorial we followed
// https://mdbootstrap.com/education/react/agenda-4-bootstrap/

import React, {Component} from 'react';
import Edit from "./components/Edit";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import {ShowVehicles} from "./components/ShowVehicles";

// import './App.css';

export class App extends Component {

  constructor(props) {
	/* properties
	columnHeadings
	vehicles
	*/

	super(props);
	let _vehicles;
	// TODO: PUT A LOADER IN HERE FOR THE FIREBASE DATA
	_vehicles = [
	  {
		iid: "Jeff's Jeep",
		manufacturer: "Jeep",
		model: "Wrangler (JK)",
		odometer: 280000,
		requiresServicing: "Yes",
		dateManufactured: 2017,
		datePurchased: "2017/05/20",
		dateLastServiced: -1,
		kilometersSinceServiced: 2800000,
		kilometersPerService: 90000,
		fuelEconomy: -1,
		fuelCapacity: 104,
		weight: 1.45,
		VIN: "ExampleVIN",
		registrationNumber: "1ABC-123",
	  },
	  {
		iid: "Carol's Corolla",
		manufacturer: "Toyota",
		model: "Corolla (E160)",
		odometer: 20000,
		requiresServicing: "No",
		dateManufactured: 2014,
		datePurchased: "2018/05/10",
		dateLastServiced: -1,
		kilometersSinceServiced: 2000,
		kilometersPerService: 110000,
		fuelEconomy: -1,
		fuelCapacity: 82.5,
		weight: 1.08,
		VIN: "ExampleVIN",
		registrationNumber: "1ABC-123",
	  },
	  {
		iid: "Carol's 2nd Corolla",
		manufacturer: "Toyota",
		model: "Corolla (E160)",
		odometer: 20000,
		requiresServicing: "No",
		dateManufactured: 2014,
		datePurchased: "2018/06/04",
		dateLastServiced: -1,
		kilometersSinceServiced: 2000,
		kilometersPerService: 110000,
		fuelEconomy: -1,
		fuelCapacity: 82.5,
		weight: 1.08,
		VIN: "ExampleVIN",
		registrationNumber: "1ABC-123",
	  }
	];

	this.state = {
	  columnHeadings: [
		{
		  label: "Internal ID",
		  field: "iid",
		  sort: 'asc',
		  width: 20,
		},
		{
		  label: "Model",
		  field: `model`,
		  sort: 'asc',
		  width: 20,
		},
		{
		  label: "Make",
		  field: "manufacturer",
		  sort: 'asc',
		  width: 150
		},

		{
		  label: "Odometer (km)",
		  field: "odometer",
		},
		{
		  label: "Requires Servicing",
		  field: "requiresServicing",
		},
		{
		  label: "Date Manufactured",
		  field: "dateManufactured",
		},
		{
		  label: "Date Purchased",
		  field: "datePurchased",
		},
		{
		  label: "Last Service",
		  field: "dateLastServiced",
		},
		{
		  label: "kms since Last Service",
		  field: "kilometersSinceServiced",
		},
		{
		  label: "kms per Service",
		  field: "kilometersPerService",
		},
		{
		  label: "Fuel Economy",
		  field: "fuelEconomy",
		},
		{
		  label: "Fuel Capacity (L)",
		  field: "fuelCapacity",
		},
		{
		  label: "Weight (T)",
		  field: "weight",
		},
		{
		  label: "VIN",
		  field: "VIN",
		},
		{
		  label: "Reg. No.",
		  field: "registrationNumber",
		},
	  ],
	  headingsAndData: [],
	  vehicles: _vehicles,
	};
  }

  componentDidMount() {
	this.setState({headingsAndData: []})
  }

  delete = (e, index) => {
	this.setState({vehicles: this.state.vehicles.slice(0, index).concat(this.state.vehicles.slice(index + 1))});
  };

  editVehicle = (vehicle, callback) => {
	this.setState(prevState => {
	  const {vehicles} = prevState;
	  const indexOfVehicleToBeEdited = vehicles.findIndex(v => v.iid === vehicle.iid);
	  vehicles[indexOfVehicleToBeEdited] = vehicle;

	  return ({vehicles});
	}, callback);
  };

  render() {
	if (this.state.vehicles == null) {
	  return (
		<div>Loading Data, setting states</div>
	  )
	} else {
	  return (
		<Switch>
		  {/*pass props from react-router (such as history and match), along with vehicles from the state*/}
		  <Route
			exact
			path="/"
			render={
			  props => <ShowVehicles {...props} vehicles={this.state.vehicles}/>}
		  />
		  {/*pass props from react-router (such as history and match), along with vehicles from the state and editVehicle*/}
		  <Route
			path="/edit/:iid"
			render={
			  props =>
				<Edit
				  {...props}
				  vehicles={this.state.vehicles}
				  editVehicle={this.editVehicle}
				/>
			}
		  />
		  <Route exact path="/add/" component={Edit}/>
		  {/*<Route path="/create" component={ Create }/>*/}
		  {/*<Route path="/show/:id" component={ Show }/>*/}
		</Switch>
	  )
	}
  }
}
