import _ from 'lodash';
import * as Filters from '../../../../../api/filters.service';
const boxFilters = require('./filters.config').boxFilters;


export const GET_DATA = "GET_DATA"

export function GetACDAgentsReducer() {
  return (dispatch, getState) => {
  Filters.getACDAgents().then(function (response) {
      if (response.status === 200) {
        console.log("ACD_AGENT_CHECK_LIST", response.data);
        let acdAgentsData = _.map(response.data, (obj) => {
          return {
            value: obj.Id,
            label: obj.Name,
            checked:false
          };

        });
        dispatch({
          type: GET_DATA,
          payload: acdAgentsData,
          filterKey: "FILTER_ACD_AGENTS",
          controlKey: "ACD_AGENT_CHECK_LIST",
          controlProp: "CheckList"
        });
      }
    });
  }

}
export function GetAgentsReducer() {
  return (dispatch, getState) => {
    Filters.getAgents().then(function (response) {
      if (response.status === 200) {
        console.log("agentsData", response.data);
        let agentsData = _.map(response.data, (obj) => {
          return {
            value: obj.Id,
            label: obj.Name,
            checked:false
          };

        });
        dispatch({
          type: GET_DATA,
          payload: agentsData,
          filterKey: "FILTER_AGENTS",
          controlKey: "SPECIFIC_AGNET_LIST",
          controlProp: "CheckList"
        });
      }
    });
  }

}

export function GetBreakTypesReducer() {
  return (dispatch, getState) => {
    Filters.getBreakTypes().then(function (response) {
      if (response.status === 200) {
        console.log("BREAK_TYPE_CHECK_LIST", response.data);
        let breakTypesData = _.map(response.data, (obj) => {
          return {
            value: obj.Id,
            label: obj.Name
          };

        });
        dispatch({
          type: GET_DATA,
          payload: breakTypesData,
          filterKey: "FILTER_BREAK_TYPE",
          controlKey: "BREAK_TYPE_CHECK_LIST",
          controlProp: "CheckList"
        });
      }
    });
  }

}
function  processNode(node) {
    let  obj=
      {
        value:node.GroupId,
        label:node.Name,
        children: node.ChildrenNode != null?
          iterateNodes(node.ChildrenNode)
          :[]
         
      }
      return obj;
}

function iterateNodes(nodes) {
  return nodes.map(node=>processNode(node));  
}
export function GetDirectoryReducer(gid,pid) {
   return (dispatch, getState) => {
  Filters.getDirectories(1,-1).then(function (response) {
    if (response.status === 200) {
    let  options = iterateNodes(response.data);
    console.log("processed nodes", options);
        dispatch({
          type: GET_DATA,
          payload: options,
          filterKey: "FILTER_DIRECTORY_TREE",
          controlKey: "DIRECTORY_TREE_LIST",
          controlProp: "Nodes"
        });
      }
  });
}
}

export function GetCampaignsReducer() {
  return (dispatch, getState) => {
    Filters.getCampaigns().then(function (response) {
      if (response.status === 200) {
        console.log("CAMPAIGN_CHECK_LIST", response.data);
        let campaignsData = _.map(response.data, (obj) => {
          return {
            value: obj.Id,
            label: obj.Name
          };

        });
        dispatch({
          type: GET_DATA,
          payload: campaignsData,
          filterKey: "FILTER_CAMPAIGN",
          controlKey: "CAMPAIGN_CHECK_LIST",
          controlProp: "CheckList"
        });
      }
    });
  }

}

export function GetCompletionCodesReducer() {
  return (dispatch, getState) => {
    Filters.getCompletionCodes().then(function (response) {
      if (response.status === 200) {
        let completionCodesData = _.map(response.data, (obj) => {
          return {
            value: obj.Id,
            label: obj.Name
          };

        });
        dispatch({
          type: GET_DATA,
          payload: completionCodesData,
          filterKey: "FILTER_COMPLETION_CODE",
          controlKey: "COMPLETION_CODE_CHECK_LIST",
          controlProp: "CheckList"
        });
      }
    });
  }

}

export function GetSitesReducer() {
  return (dispatch, getState) => {
  Filters.getSites().then(function (response) {
      if (response.status === 200) {
        console.log("SITE_CHECK_LIST", response.data);
        let sitesData = _.map(response.data, (obj) => {
          return {
            value: obj.Id,
            label: obj.Name
          };

        });
        dispatch({
          type: GET_DATA,
          payload: sitesData,
          filterKey: "FILTER_SITE",
          controlKey: "SITE_CHECK_LIST",
          controlProp: "CheckList"
        });
      }
    });
  }

}

export function GetTrunkGroupsReducer() {
    return (dispatch, getState) => {
        Filters.getTrunkGroups().then(function (response) {
            if (response.status === 200) {
                console.log("TRUNKGROUP_CHECK_LIST", response.data);
                let trunkGroupData = _.map(response.data, (obj) => {
                    return {
                        value: obj.Id,
                        label: obj.Name
                    };

            });
            dispatch({
                type: GET_DATA,
                payload: trunkGroupData,
                filterKey: "FILTER_TRUNK_GROUP",
                controlKey: "TRUNK_GROUP_CHECK_LIST",
                controlProp: "CheckList"
            });
        }
        });
}

}

export function GetTeamsReducer() {
    return (dispatch, getState) => {
        Filters.getTeams().then(function (response) {
            if (response.status === 200) {
                console.log("TEAMS_CHECK_LIST", response.data);
                let teamsData = _.map(response.data, (obj) => {
                    return {
                        value: obj.Id,
                        label: obj.Name
                    };

            });
            dispatch({
                type: GET_DATA,
                payload: teamsData,
                filterKey: "FILTER_TEAMS",
                controlKey: "TEAMS_CHECK_LIST",
                controlProp: "CheckList"
            });
        }
        });
}

}

export function GetQueuesReducer() {
    return (dispatch, getState) => {
        Filters.getQueues().then(function (response) {
            if (response.status === 200) {
                console.log("QUEUE_CHECK_LIST", response.data);
                let queuesData = _.map(response.data, (obj) => {
                    return {
                        value: obj.Id,
                        label: obj.Name
                    };

            });
            dispatch({
                type: GET_DATA,
                payload: queuesData,
                filterKey: "FILTER_QUEUE",
                controlKey: "QUEUE_CHECK_LIST",
                controlProp: "CheckList"
            });
        }
        });
}

} 

export function GetEmailSMSReducer() {
    return (dispatch, getState) => {
        Filters.getEmailSMS().then(function (response) {
            if (response.status === 200) {
                console.log("Emailsms", response.data);
                let emailSMSData = _.map(response.data, (obj) => {
                    return {
                        value: obj.Id,
                        label: obj.Name
                    };

            });
            dispatch({
                type: GET_DATA,
                payload: emailSMSData,
                filterKey: "FILTER_EMAIL_SMS",
                controlKey: "EMAIL_SMS_OPTION",
                controlProp: "Options"
            });
        }
        });
}

}

export function GetCallTypesReducer() {
    return (dispatch, getState) => {
        Filters.getCallTypes().then(function (response) {
            if (response.status === 200) {
                console.log("call types", response.data);
                let callTypesData = _.map(response.data, (obj) => {
                    return {
                        value: obj.Id,
                        label: obj.Name
                    };

            });
            dispatch({
                type: GET_DATA,
                payload: callTypesData,
                filterKey: "FILTER_CALL_TYPE",
                controlKey: "CALL_TYPE_OPTION",
                controlProp: "Options"
            });
        }
        });
}

}

export const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    const control = _.find(
      _.find(state.boxFilters, (boxFilter) => boxFilter.Key === action.filterKey).Controls,
      (control) => control.Key === action.controlKey
    );
    control[action.controlProp] = action.payload;
    return Object.assign({}, state, {});
  }
}

const initialState = {
  boxFilters: boxFilters
};

export default function FiltersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}