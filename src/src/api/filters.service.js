import Constants from "../constants/apiUrl"

import {
  axiosGet
} from "./service"


export function getACDAgents() {
  return axiosGet(
    Constants.ACDAGENT
  )
}


export function getAgents() {
  return axiosGet(
    Constants.AGENT
  )
}

export function getBreakTypes() {
  return axiosGet(
    Constants.BREAKTYPES
  )
}

export function getDirectories(gid,pid) {
  return axiosGet(
    
    Constants.DIRECTORYTREE + '/'+gid+'/'+pid
  )
}

export function getCampaigns() {
  return axiosGet(
    
    Constants.CAMPAIGN 
  )
}

export function getCompletionCodes() {
  return axiosGet(
    
    Constants.COMPLETION_CODES 
  )
}
export function getSites() {
    return axiosGet(
    
      Constants.SITES 
    )
}

export function getTrunkGroups() {
    return axiosGet(
    
      Constants.TRUNKGROUP 
    )
}

export function getTeams() {
    return axiosGet(
    
      Constants.TEAMS 
    )
}

export function getQueues() {
    return axiosGet(
    
      Constants.QUEUE 
    )
}

export function getEmailSMS() {
    return axiosGet(
    
      Constants.EMAIL_SMS 
    )
}

export function getCallTypes() {
    return axiosGet(
    
      Constants.CALL_TYPES 
    )
}

