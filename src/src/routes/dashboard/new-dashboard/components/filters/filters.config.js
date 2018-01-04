const dayOptions = [
    {
        "value": "Today",
        "label": "Today"
    },
    {
        "value": "ThisWeek",
        "label": "This Week"
    },
    {
        "value": "ThisMonth",
        "label": "This Month"
    },
    {
        "value": "ThisYear",
        "label": "This Year"
    },
    {
        "value": "Yesterday",
        "label": "Yesterday"
    },
    {
        "value": "LastWeek",
        "label": "Last Week"
    },
    {
        "value": "LastMonth",
        "label": "Last Month"
    },
    {
        "value": "LastYear",
        "label": "Last Year"
    },
    {
        "value": "SpecifiedDates",
        "label": "Specified Dates"
    },
    {
        "value": "InTheLastTimePeriod",
        "label": "In The Last Time Period"
    }
];

const timeUnitOptions = [
    {
        "value": "Minutes",
        "label": "Minutes"
    },
    {
        "value": "Hours",
        "label": "Hours"
    },
    {
        "value": "Days",
        "label": "Days"
    },
    {
        "value": "Weeks",
        "label": "Weeks"
    },
    {
        "value": "Months",
        "label": "Months"
    },
    {
        "value": "Years",
        "label": "Years"
    }
]
const compareOptions = [
    {
        "value": "Between",
        "label": "Between"
    },
    {
        "value": "Outside",
        "label": "Outside"
    },
    {
        "value": "LessThan",
        "label": "Less Than"
    },
    {
        "value": "GreaterThan",
        "label": "Greater Than"
    },
    {
        "value": "EqualsTo",
        "label": "Equals To"
    }
];

const includeExcludeNodes = [
    { label: "Include", value: "Include" }, { label: "Exclude", value: "Exclude" }
];

const strcmpOptions = [
    {
        "value": "BeginningWith",
        "label": "Beginning With"
    },
    {
        "value": "Containing",
        "label": "Containing"
    },
    {
        "value": "EndingWith",
        "label": "Ending With"
    },
    {
        "value": "EqualsTo",
        "label": "Equals To"
    }
];

const callFlagOptions = [
    {
        "value": "1",
        "label": "Divert On Busy"
    },
    {
        "value": "2",
        "label": "Divert On No Answer"
    },
    {
        "value": " ' 3'",
        "label": "Divert Preset"
    },
    {
        "value": "4",
        "label": "Pickup"
    },
    {
        "value": "5",
        "label": "Group Pickup"
    },
    {
        "value": "6",
        "label": "Speed Dial"
    },
    {
        "value": "7",
        "label": "Unanswered"
    },
    {
        "value": "8",
        "label": "Engaged"
    },
    {
        "value": "9",
        "label": "Operator Involved"
    },
    {
        "value": "10",
        "label": "Conference"
    }
];

export const boxFilters = [
    {
        "Key": "FILTER_DATE",
        "Type": "Date",
        "IsActive": false,
        "Controls": [
            {
                "Key": "DATE_SELECTED",
                "Label": "Selected",
                "Type": "dropdown",
                "Options": dayOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "START_DATE",
                "Label": "Start Date",
                "Type": "date",
                "Value": "",
                "IsDisabled": true,
                "PlaceHolder": "01/01/2016",
                "IsVisible": true
            },
            {
                "Key": "END_DATE",
                "Label": "End Date",
                "Type": "date",
                "Value": "",
                "IsDisabled": true,
                "PlaceHolder": "01/01/2017",
                "IsVisible": true
            },
            {
                "Key": "LAST_TIME_QUANTITY",
                "Label": "Select the last",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0",
                "IsVisible": false
            },
            {
                "Key": "LAST_TIME_UNITS",
                "Label": "",
                "Type": "dropdown",
                "Options": timeUnitOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsVisible": false
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "DATE_SELECTED",
                "DependeeValue": [
                    "Specified Dates"
                ],
                "DependentsKeys": [
                    "START_DATE",
                    "END_DATE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            },
            {
                "DependeeKey": "DATE_SELECTED",
                "DependeeValue": [
                    "Today",
                    "Yesterday",
                    "This Week",
                    "This Month",
                    "This Year",
                    "Last Week",
                    "Last Month",
                    "Last Year"
                ],
                "DependentsKeys": [
                    "START_DATE",
                    "END_DATE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "DATE_SELECTED",
                "DependeeValue": [
                    "In The Last Time Period"
                ],
                "DependentsKeys": [
                    "LAST_TIME_QUANTITY",
                    "LAST_TIME_UNITS"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "DATE_SELECTED",
                "DependeeValue": [
                    "In The Last Time Period"
                ],
                "DependentsKeys": [
                    "START_DATE",
                    "END_DATE"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": false
            },
            {
                "DependeeKey": "DATE_SELECTED",
                "DependeeValue": [
                    "Today",
                    "Yesterday",
                    "This Week",
                    "This Month",
                    "This Year",
                    "Last Week",
                    "Last Month",
                    "Last Year",
                    "Specified Dates"
                ],
                "DependentsKeys": [
                    "START_DATE",
                    "END_DATE"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "DATE_SELECTED",
                "DependeeValue": [
                    "Today",
                    "Yesterday",
                    "This Week",
                    "This Month",
                    "This Year",
                    "Last Week",
                    "Last Month",
                    "Last Year",
                    "Specified Dates"
                ],
                "DependentsKeys": [
                    "LAST_TIME_QUANTITY",
                    "LAST_TIME_UNITS"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": false
            }
        ],
    },
    {
        "Key": "FILTER_EXTENTIONS",
        "Type": "Extentions",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SELECTING_EXTENTIONS",
                "Label": "Selecting Extentions",
                "Type": "dropdown",
                "Options": compareOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "EXTENTIONS_FROM_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            },
            {
                "Key": "EXTENTIONS_TO_VALUE",
                "Label": "and",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "SELECTING_EXTENTIONS",
                "DependeeValue": [
                    "Less Than",
                    "Greater Than",
                    "Equals To"
                ],
                "DependentsKeys": [
                    "EXTENTIONS_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "SELECTING_EXTENTIONS",
                "DependeeValue": [
                    "Between",
                    "Outside"
                ],
                "DependentsKeys": [
                    "EXTENTIONS_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_NUMBERS_DIALLED",
        "Type": "Numbers Dialled",
        "IsActive": false,
        "Controls": [
            {
                "Key": "NUMBERS_DIALLED_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "NUMBERS_DIALLED_COMPARE_OPERATOR",
                "Label": "Numbers Dialled",
                "Type": "dropdown",
                "Options": strcmpOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "NUMBERS_DIALLED_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_COST",
        "Type": "Cost",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SELECTING_COST",
                "Label": "Selecting costs",
                "Type": "dropdown",
                "Options": compareOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "COST_FROM_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            },
            {
                "Key": "COST_TO_VALUE",
                "Label": "and",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "SELECTING_COST",
                "DependeeValue": [
                    "Less Than",
                    "Greater Than",
                    "Equals To"
                ],
                "DependentsKeys": [
                    "COST_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "SELECTING_COST",
                "DependeeValue": [
                    "Between",
                    "Outside"
                ],
                "DependentsKeys": [
                    "COST_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_ACCESS_CODE",
        "Type": "Access Code",
        "IsActive": false,
        "Controls": [
            {
                "Key": "ACCESS_CODE_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "ACCESS_CODE_COMPARE_OPERATOR",
                "Label": "Access codes",
                "Type": "dropdown",
                "Options": strcmpOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "ACCESS_CODE_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_ACCOUNT_CODE",
        "Type": "Account Code",
        "IsActive": false,
        "Controls": [
            {
                "Key": "ACCOUNT_CODE_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "ACCOUNT_CODE_COMPARE_OPERATOR",
                "Label": "Account codes",
                "Type": "dropdown",
                "Options": strcmpOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "ACCOUNT_CODE_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_ACD",
        "Type": "ACD",
        "IsActive": false,
        "Controls": [
            {
                "Key": "ACD_CHECK_LIST",
                "Label": "Calls made at the following ACD's",
                "Type": "check-box-list-group",
                "CheckList": [
                    {
                        "value": "1",
                        "label": "Queueless ACD Calls",
                        "checked": false
                    },
                    {
                        "value": "2",
                        "label": "ACD Calls",
                        "checked": false
                    },
                    {
                        "value": "3",
                        "label": "Calls",
                        "checked": true
                    }
                ]
            },
            {
                "Key": "ACD_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_AGENTS",
        "Type": "Agent",
        "IsActive": false,
        "Controls": [
            {
                "Key": "AGENT_CHECK_LIST",
                "Label": "Calls made at the following agents. When either cradle to grave or specific agents are chosen, the calls will be split across IsMultiSelectple entries and this may have an effect on the total number of calls displayed.",
                "Type": "dropdown",
                "Options": [
                    {
                        "value": "1",
                        "label": "Cradle to grave on"
                    },
                    {
                        "value": "2",
                        "label": "Cradle to grave off"
                    },
                    {
                        "value": "3",
                        "label": "specific agents"
                    }
                ],
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "Value": ""
            },
            {
                "Key": "GRAVE_OFF_LIST",
                "Label": "",
                "Type": "dropdown",
                "Options": [{
                    "value": "1",
                    "label": "First Agent"
                },
                {
                    "value": "2",
                    "label": "Last Agent"
                },
                {
                    "value": "3",
                    "label": "Longest Talk Time"
                }],
                "IsDisabled": false,
                "IsVisible": false,
                "PlaceHolder": "Select an option",
                "Value": ""
            },
            {
                "Key": "SPECIFIC_AGNET_LIST",
                "Label": "",
                "Type": "check-box-list-group",
                "CheckList": [],
                "IsDisabled": false,
                "IsVisible": false,
                "Value": ""
            },
            {
                "Key": "AGENT_SHOW_DELETE_OPTION",
                "Label": "Show Deleted",
                "Type": "checkbox",
                "IsVisible": false,
                "Value": false
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "AGENT_CHECK_LIST",
                "DependeeValue": [
                    "Cradle to grave off"
                ],
                "DependentsKeys": [
                    "GRAVE_OFF_LIST"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "AGENT_CHECK_LIST",
                "DependeeValue": [
                    "specific agents"
                ],
                "DependentsKeys": [
                    "SPECIFIC_AGNET_LIST",
                    "AGENT_SHOW_DELETE_OPTION"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "AGENT_CHECK_LIST",
                "DependeeValue": [
                    "Cradle to grave on",
                    "specific agents"
                ],
                "DependentsKeys": [
                    "GRAVE_OFF_LIST"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": false
            },
            {
                "DependeeKey": "AGENT_CHECK_LIST",
                "DependeeValue": [
                    "Cradle to grave on",
                    "Cradle to grave off"
                ],
                "DependentsKeys": [
                    "SPECIFIC_AGNET_LIST",
                    "AGENT_SHOW_DELETE_OPTION"
                ],
                "DependentProp": "IsVisible",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_ACD_AGENTS",
        "Type": "ACD Agents",
        "IsActive": false,
        "Controls": [
            {
                "Key": "ACD_AGENT_CHECK_LIST",
                "Label": "Calls made at the following ACD agents",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "ACD_AGENT_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            },
            {
                "Key": "ACD_AGENT_SHOW_DELETE_OPTION",
                "Label": "Show Deleted",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_AUTHORIZATION_CODE",
        "Type": "Authorization Code",
        "IsActive": false,
        "Controls": [
            {
                "Key": "AUTHORIZATION_CODE_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "AUTHORIZATION_CODE_COMPARE_OPERATOR",
                "Label": "Authorization codes",
                "Type": "dropdown",
                "Options": strcmpOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "AUTHORIZATION_CODE_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_ANSWER_TIME",
        "Type": "Answer Time",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SELECTING_ANSWER_TIME",
                "Label": "Selecting Answer Times",
                "Type": "dropdown",
                "Options": compareOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "ANSWER_TIME_FROM_VALUE",
                "Label": "",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            },
            {
                "Key": "ANSWER_TIME_TO_VALUE",
                "Label": "and",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "SELECTING_ANSWER_TIME",
                "DependeeValue": [
                    "Less Than",
                    "Greater Than",
                    "Equals To"
                ],
                "DependentsKeys": [
                    "ANSWER_TIME_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "SELECTING_ANSWER_TIME",
                "DependeeValue": [
                    "Between",
                    "Outside"
                ],
                "DependentsKeys": [
                    "ANSWER_TIME_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_CALL_FLAG",
        "Type": "Call Flag",
        "IsActive": false,
        "Controls": [
            {
                "Key": "CALL_FLAG_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "CALL_FLAG_OPTION",
                "Label": "Calls with call flags of",
                "Type": "dropdown",
                "Options": callFlagOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_BREAK_TYPE",
        "Type": "Break Type",
        "IsActive": false,
        "Controls": [
            {
                "Key": "BREAK_TYPE_CHECK_LIST",
                "Label": "Calls made at the following break types",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "BREAK_TYPE_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            },
            {
                "Key": "BREAK_TYPE_SHOW_DELETE_OPTION",
                "Label": "Show Deleted",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_CALLER_ID",
        "Type": "Caller ID",
        "IsActive": false,
        "Controls": [
            {
                "Key": "CALLER_ID_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "CALLER_ID_COMPARE_OPERATOR",
                "Label": "Caller ID",
                "Type": "dropdown",
                "Options": strcmpOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "CALLER_ID_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_CALL_TYPE",
        "Type": "Call Type",
        "IsActive": false,
        "Controls": [
            {
                "Key": "CALL_TYPE_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "CALL_TYPE_OPTION",
                "Label": "Calls with call types of",
                "Type": "dropdown",
                "Options": [],
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_CAMPAIGN",
        "Type": "Campaign",
        "IsActive": false,
        "Controls": [
            {
                "Key": "CAMPAIGN_CHECK_LIST",
                "Label": "Calls made at the following campaigns",
                "Type": "check-box-list-group",
                "CheckList": []

            },
            {
                "Key": "CAMPAIGN_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            },
            {
                "Key": "CAMPAIGN_SHOW_DELETE_OPTION",
                "Label": "Show Deleted",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_DIRECTORY_TREE",
        "Type": "Directory",
        "IsActive": false,
        "Controls": [
            {
                "Key": "DIRECTORY_TREE_LIST",
                "Type": "check-box-tree",
                "Label": "",
                "Nodes": [],
                "Value": []
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_CARRIER_TIER_RATE",
        "Type": "Carrier, Tier and Rate",
        "IsActive": false,
        "Controls": [
            {
                "Key": "CARRIER_TIER_RATE_TREE",
                "Type": "check-box-tree",
                "Label": "",
                "Nodes": [],
                "Value": []
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_COMPLETION_CODE",
        "Type": "Completion Code",
        "IsActive": false,
        "Controls": [
            {
                "Key": "COMPLETION_CODE_CHECK_LIST",
                "Label": "Calls made at the following break types",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "COMPLETION_CODE_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            },
            {
                "Key": "COMPLETION_CODEE_SHOW_DELETE_OPTION",
                "Label": "Show Deleted",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_EMAIL_SMS",
        "Type": "Email/SMS",
        "IsActive": false,
        "Controls": [
            {
                "Key": "EMAIL_SMS_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "EMAIL_SMS_OPTION",
                "Label": "",
                "Type": "dropdown",
                "Options": [],
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_DURATION",
        "Type": "Duration",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SELECTING_DURATION",
                "Label": "Selecting durations",
                "Type": "dropdown",
                "Options": compareOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "DURATION_FROM_VALUE",
                "Label": "",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            },
            {
                "Key": "DURATION_TO_VALUE",
                "Label": "and",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "SELECTING_DURATION",
                "DependeeValue": [
                    "Less Than",
                    "Greater Than",
                    "Equals To"
                ],
                "DependentsKeys": [
                    "DURATION_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "SELECTING_DURATION",
                "DependeeValue": [
                    "Between",
                    "Outside"
                ],
                "DependentsKeys": [
                    "DURATION_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_QUEUE",
        "Type": "Queue",
        "IsActive": false,
        "Controls": [
            {
                "Key": "QUEUE_CHECK_LIST",
                "Label": "Calls made at the following queues",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "QUEUE_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            },
            {
                "Key": "QUEUE_SHOW_DELETE_OPTION",
                "Label": "Show Deleted",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_PRIVATE_NUMBER",
        "Type": "Private Number",
        "IsActive": false,
        "Controls": [
            {
                "Key": "PRIVATE_NUMBER_INCLUDE_EXCLUDE",
                "Label": "",
                "Type": "toggle-switch",
                "Nodes": includeExcludeNodes,
                "Value": "",
                "IsDisabled": false
            },
            {
                "Key": "PRIVATE_NUMBER_COMPARE_OPERATOR",
                "Label": "Private Numbers",
                "Type": "dropdown",
                "Options": strcmpOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "PRIVATE_NUMBER_VALUE",
                "Label": "",
                "Type": "number",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "0"
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_TIMES_OF_THE_DAY",
        "Type": "Times Of The Day",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SELECTING_TIMES_OF_THE_DAY",
                "Label": "Selecting Times Of Day",
                "Type": "dropdown",
                "Options": compareOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "TIMES_OF_THE_DAY_FROM_VALUE",
                "Label": "",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            },
            {
                "Key": "TIMES_OF_THE_DAY_TO_VALUE",
                "Label": "and",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "SELECTING_TIMES_OF_THE_DAY",
                "DependeeValue": [
                    "Less Than",
                    "Greater Than",
                    "Equals To"
                ],
                "DependentsKeys": [
                    "TIMES_OF_THE_DAY_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "SELECTING_TIMES_OF_THE_DAY",
                "DependeeValue": [
                    "Between",
                    "Outside"
                ],
                "DependentsKeys": [
                    "TIMES_OF_THE_DAY_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_SITE",
        "Type": "Site",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SITE_CHECK_LIST",
                "Label": "Calls made at the following sites",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "SITE_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_TRUNK_LINE",
        "Type": "Trunk Line",
        "IsActive": false,
        "Controls": [
            {
                "Key": "SELECTING_TRUNK_LINE",
                "Label": "Selecting trunk lines",
                "Type": "dropdown",
                "Options": compareOptions,
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "Select an option",
                "IsMultiSelect": false
            },
            {
                "Key": "TRUNK_LINE_FROM_VALUE",
                "Label": "",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            },
            {
                "Key": "TRUNK_LINE_TO_VALUE",
                "Label": "and",
                "Type": "text",
                "Value": "",
                "IsDisabled": false,
                "PlaceHolder": "00:00:00"
            }
        ],
        "Dependencies": [
            {
                "DependeeKey": "SELECTING_TRUNK_LINE",
                "DependeeValue": [
                    "Less Than",
                    "Greater Than",
                    "Equals To"
                ],
                "DependentsKeys": [
                    "TRUNK_LINE_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": true
            },
            {
                "DependeeKey": "SELECTING_TRUNK_LINE",
                "DependeeValue": [
                    "Between",
                    "Outside"
                ],
                "DependentsKeys": [
                    "TRUNK_LINE_TO_VALUE"
                ],
                "DependentProp": "IsDisabled",
                "DependentPropValue": false
            }
        ]
    },
    {
        "Key": "FILTER_TEAMS",
        "Type": "Teams",
        "IsActive": false,
        "Controls": [
            {
                "Key": "TEAMS_CHECK_LIST",
                "Label": "Calls made at the following teams",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "TEAMS_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    },
    {
        "Key": "FILTER_TRUNK_GROUP",
        "Type": "Trunk Group",
        "IsActive": false,
        "Controls": [
            {
                "Key": "TRUNK_GROUP_CHECK_LIST",
                "Label": "Calls made at the following trunk groups",
                "Type": "check-box-list-group",
                "CheckList": []
            },
            {
                "Key": "TRUNK_GROUP_EXCLUDE_OPTION",
                "Label": "Exclude Items",
                "Type": "checkbox",
                "Value": false
            }
        ],
        "Dependencies": []
    }
];