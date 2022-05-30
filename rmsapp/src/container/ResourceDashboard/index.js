import { memo, useEffect, compose } from "react";
import { connect } from "react-redux";
import propTypes from 'prop-types';
import {makeSelectResourceData} from './selectors'
import { fetchResourceData } from "./actions";
import { createStructuredSelector } from 'reselect';


export function ResourceDashboard(props){

    useEffect(() => {

        props.fetchResources()
    },[]);
return(
    <div>
        ResourceDashboard
      {props.resourceProfile}
    </div>
    );


}

ResourceDashboard.propTypes={
    resourceProfile: propTypes.array,
    fetchResources: propTypes.func,
} 

const mapStateToProps = createStructuredSelector({
    resourceProfile: makeSelectResourceData(),
   
  });
  

  export function mapDispatchToProps(dispatch) {
    return {
        fetchResources: () => {
            dispatch(fetchResourceData())
        },
    };
  }

// const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   );

  
export default  connect(mapStateToProps,mapDispatchToProps)(ResourceDashboard);
  