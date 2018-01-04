import { connect } from 'react-redux';

import Filters from "./filters.component";

import * as Reducer from './filters.reducer';

const mapDispatchToProps = (dispatch) => {
  return {
      GetACDAgents: () => {
      dispatch(Reducer.GetACDAgentsReducer())
    },   
     GetAgents: () => {
      dispatch(Reducer.GetAgentsReducer())
    },   
    GetBreakTypes: () => {
      dispatch(Reducer.GetBreakTypesReducer())
    },
    GetDirectories: () => {
      dispatch(Reducer.GetDirectoryReducer())
    },

     GetCampaigns: () => {
      dispatch(Reducer.GetCampaignsReducer())
    },
      GetCompletionCodes: () => {
      dispatch(Reducer.GetCompletionCodesReducer())
    },
    GetSites: () => {
    dispatch(Reducer.GetSitesReducer())
},   
GetTrunkGroups: () => {
    dispatch(Reducer.GetTrunkGroupsReducer())
    },   
GetTeams: () => {
    dispatch(Reducer.GetTeamsReducer())
},
GetQueues: () => {
    dispatch(Reducer.GetQueuesReducer())
},

GetEmailSMS: () => {
    dispatch(Reducer.GetEmailSMSReducer())
},
GetCallTypes: () => {
    dispatch(Reducer.GetCallTypesReducer())
}
  }
}


const mapStateToProps = (state) => ({
  filters: state.filters
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters)  