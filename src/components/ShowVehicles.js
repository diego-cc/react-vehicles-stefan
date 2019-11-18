import React from 'react';
import {MDBBtn, MDBContainer, MDBListGroup, MDBListGroupItem} from "mdbreact";

export const ShowVehicles = props => {
  const {vehicles, history} = props;
  return (
	<MDBContainer>
	  <h1 className="text-center">Vehicles:</h1>
	  {
		vehicles ?
		  (
			<>
			  {
				vehicles
				  .map((vehicle, index) => (
					<MDBContainer key={index} className="text-center my-5">
					  <h2>{`${vehicle.manufacturer} ${vehicle.model}`}</h2>
					  <MDBBtn
						color="warning"
						onClick={() => history.push(`/edit/${vehicle.iid}`)}>
						Edit
					  </MDBBtn>
					  <MDBListGroup>
						{
						  Object
							.keys(vehicle)
							.map((field, i) => (
							  <MDBListGroupItem key={i}>
								{field}: {vehicle[field]}
							  </MDBListGroupItem>
							))
						}
					  </MDBListGroup>
					</MDBContainer>
				  ))
			  }
			</>
		  )
		  :
		  (
			<div className="spinner-border text-primary" role="status">
			  <span className="sr-only">Loading...</span>
			</div>
		  )
	  }
	</MDBContainer>
  )
};
