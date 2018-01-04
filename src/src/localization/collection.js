export const PageEnums = {
  MY_DASHBOARD: 'my dashboard',
  WIDGET_SETTINGS: 'widget settings',
  WIDGET_STYLES: 'WIDGET_STYLES',
  NOTIFICATIONS: 'NOTIFICATIONS',
  NEW_DASHBOARD: 'new dashboard',
  VIEW_DASHBOARD: 'VIEW_DASHBOARD',
  PREVIEW_DASHBOARD: 'PREVIEW_DASHBOARD',
  DATA_METRICS: 'DATA_METRICS',
  THRESHOLDS: 'THRESHOLDS'
}

const collection = {
  MY_DASHBOARD: {
    name: PageEnums.MY_DASHBOARD, strings: [
      "Dashboard Name",
      "Modified"
    ]
  },
  NEW_DASHBOARD: {
    name: PageEnums.NEW_DASHBOARD, strings: [
      "Picture",
      "Bar",
      "Progress",
      "Files",
      "Save",
      "Save As",
      "Preview",
      "Live",
      "Pie",
      "Speedo",
      "Clock",
      "Box",
      "Combo",
      "Text",
      "Name",
      "Default",
      "Global",
      "Delete",
      "Hide",
      "Are you sure you want to discard the changes?",
      "Are you sure you want to delete",
      "dashboard?",
      "Save",
      "Save As",
      "Save Dashboard",
      "Save As Dashboard",
      "Enter dashboard name",
      "A dashboard with name",
      "already exists. Do you want to overwrite?",
      "Save And Exit",
      "Dashboard Name",
      "Notification triggered",
      "Invalid credentials",
      "Invalid server or portnumber",
      "Some error occured."
      
    ]
  },
  DATA_METRICS: {
    name: PageEnums.DATA_METRICS, strings: [
      "Combo Settings",
      "Data Metrics",
      "Statistics:",
      "Statistic Group:",
      "Selected Statistic items",
      "Add Statistic Item",
      "Aggregate Function",
      "Display Format",
      "Edit", "Delete",
      "Apply",
      "Statistic Item",
      "Select Widget",
      "Cancel",
      "Add Item",
      "Edit Item",
      "Preview",
      "Custom Query",
      "Type your custom query",
      "Next",
      "Choose/Configure Column",
      "Add Column",
      "Column",
      "Column:",
      "Type:",
      "Display Name:",
      "Show Zero Values:",
      "Select filter(s):",
      "Add / Edit",
      "Validate Query",
      " Summary:",
      "Date Format :",
      "Please select a statistic item",
      "Statistic Function:"
    ]
  },
  THRESHOLDS: {
    name: PageEnums.THRESHOLDS, strings: [
      "Test",
      "Column :",
      "When it reaches :",
      "Color :",
      "Email to :",
      "SMS to :"
    ]},
  WIDGET_STYLES: {
    name: PageEnums.WIDGET_STYLES, strings: [
    "Segment Color 1:",
    "Segment Color 2:",
    "Segment Color 3:",
    "Background Color:",
    "Title:",
    "Title color:",
    "Title font:",
    "Title font size:",
    "Value color:",
    "Value font:",
    "Value font size:",
    "Min:",
    "Max:",
    "Range color:",
    "Range font:",
    "Range font size:",
    "Refresh interval (in sec):",
    "Save"
    ]}
}

export default collection;
