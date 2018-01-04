import WidgetType from '../enums/widget-type.enum';
import ScrollTypeEnum from '../enums/scroll-type-enum';
import DefaultImage from '../../public/Images/NoImage.jpg';
import PictureStretchEnum from '../enums/picture-stretch-enum';
import * as ConstantValues from '../../constants/constantValues';

import _ from 'lodash';
/**
 * To get the widget based on widget type.
 * @param {*} widgetType 
 * @param {*} isCombo 
 */
export function GetWidget(widgetType, isCombo, zIndex) {
    switch (widgetType) {
        case WidgetType.Box:
            return {
                x: 1, y: 1, width: 150, height: 100, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Box,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                appliedBackgroundColor: {
                    r: 0, g: 192, b: 239, a: 1
                },
                widgetBody: {
                    backgroundColor: {
                        r: 0, g: 192, b: 239, a: 1
                    }
                },
                value: 0,
                displayValue: "--",
                refreshInterval: '',
                title: isCombo ? '' : "<< Not Configured >>",
                valueStyles: {
                    color: {
                        r: 255, g: 255, b: 255, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                titleStyles: {
                    color: {
                        r: 255, g: 255, b: 255, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                            },
                        thresholds: [
                        ]
                    }
            };

        case WidgetType.Progress:
            return {
                x: 1, y: 1, width: 300, height: 200, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Progress,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                min: 0,
                max: 100,
                rangeValueStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                value: 0,
                displayValue: "--",
                refreshInterval: '',
                title: isCombo ? '' : "<< Not Configured >>",
                appliedBackgroundColor: {
                    r: 255, g: 255, b: 255, a: 1
                },
                widgetBody: {
                    backgroundColor: {
                        r: 255, g: 255, b: 255, a: 1
                    }
                },
                titleStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                valueStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                            },
                        thresholds: [
                        ]
                    }
            };

        case WidgetType.Speedo:
            return {
                x: 1, y: 1, width: 300, height: 200, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Speedo,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                min: 0,
                max: 100,
                rangeValueStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                value: 0,
                displayValue: "--",
                refreshInterval: '',
                title: isCombo ? '' : "<< Not Configured >>",
                appliedBackgroundColor: {
                    r: 255, g: 255, b: 255, a: 1
                },
                widgetBody: {
                    backgroundColor: {
                        r: 255, g: 255, b: 255, a: 1
                    },
                },
                segmentColors: [
                    {
                        r: 140, g: 193, b: 82, a: 1
                    },
                    {
                        r: 255, g: 190, b: 70, a: 1
                    },
                    {
                        r: 242, g: 62, b: 62, a: 1
                    }
                ],
                titleStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                valueStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                            },
                        thresholds: [
                        ]
                    }
            };

        case WidgetType.Pie:
            return {
                x: 1, y: 1, width: 300, height: 300, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Pie,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                data: [
                    {
                        label: 'data',
                        data: [100]
                    }
                ],
                refreshInterval: '',
                title: "<< Not Configured >>",
                appliedBackgroundColor: {
                    r: 255, g: 255, b: 255, a: 1
                },
                widgetBody: {
                    backgroundColor: {
                        r: 255, g: 255, b: 255, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12,
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    }
                },
                titleStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 14
                },
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                            },
                        thresholds: [
                        ]
                    }
            };

        case WidgetType.Bar:
            return {
                x: 1, y: 1, width: 450, height: 300, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Bar,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                min: 0,
                max: 100,
                enableMin: false,
                enableMax: false,
                enableBarLines: true,
                useSelectedBarColor: false,
                showYAxis: true,
                data: [

                ],
                refreshInterval: '',
                title: "<< Not Configured >>",
                appliedBackgroundColor: {
                    r: 255, g: 255, b: 255, a: 1
                },
                widgetBody: {
                    backgroundColor: {
                        r: 255, g: 255, b: 255, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12,
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    }
                },
                barStyles: {
                    backgroundColor: {
                        r: 7, g: 93, b: 102, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12,
                    color: {
                        r: 7, g: 93, b: 102, a: 1
                    }
                },
                xAxisStyles: {
                    fontFamily: 'Arial',
                    fontSize: 12,
                    color: {
                        r: 7, g: 93, b: 102, a: 1
                    }
                },
                yAxisStyles: {
                    fontFamily: 'Arial',
                    fontSize: 12,
                    color: {
                        r: 7, g: 93, b: 102, a: 1
                    }
                },
                titleStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 14
                },
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                            },
                        thresholds: [
                        ]
                    }
            };

        case WidgetType.Combo:
            return {
                x: 1, y: 1, width: 450, height: 250, z: zIndex,
                comboSelectedStatisticItem: {},
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Combo,
                showIcons: true,
                refreshInterval: '',
                comboSelectedStatisticItems: [],
                appliedBackgroundColor: {
                    r: 255, g: 255, b: 255, a: 1
                },
                widgetBody: {
                    fontFamily: 'Arial',
                    fontSize: 12,
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    }
                },
                matrix: [],
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                                comboSelectedStatisticItems: [

                                ]
                            },
                        thresholds: [
                        ],
                        group: {}
                    }
            };

        case WidgetType.Text:
            return {
                x: 1, y: 1, width: 150, height: 70, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Text,
                styleEditorTitle: 'Text Styles',
                showSettings: false,
                showEditor: false,
                showIcons: true,
                title: "<< Not Configured >>",
                titleStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: '12'
                },
                scrollType: { value: ScrollTypeEnum.None, label: 'No Scroll' },
                scrollSpeed: 10,
                appliedSettings:
                {
                    filters: [
                    ],
                    dataMetrics:
                    {
                    },
                    thresholds: [
                    ]
                }
            };

        case WidgetType.Picture:
            return {
                x: 1, y: 1, width: 100, height: 100, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Picture,
                styleEditorTitle: 'Picture Styles',
                showSettings: false,
                showEditor: false,
                showIcons: true,
                picturePath: DefaultImage, //Need to set default image.
                pictureStretch: { value: PictureStretchEnum.Fill, label: 'Fill' },
                PictureSelected: "No picture",
                appliedSettings:
                    {
                        dataMetrics: {

                        },

                    }
            };

        case WidgetType.Clock:
            return {
                x: 1, y: 1, width: 300, height: 200, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.Clock,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                displayValue: "--",
                title: ConstantValues.timezoneList[0].label,
                widgetBody: {
                    ClockbackgroundColor: {
                        r: 255, g: 255, b: 255, a: 1
                    }
                    ,
                    ClockOuterbackgroundColor: {
                        r: 0, g: 119, b: 162, a: 1
                    }
                    ,
                    clockRoundingColor: {
                        r: 14, g: 144, b: 197, a: 1

                    }
                },

                numberStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },

                    fontSize: '15'
                },
                TimezoneStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },

                    fontSize: '11'
                },
                DateStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },

                    fontSize: '15'
                },
                DaysStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontSize: '12'
                },
                CurrentDayColor: { r: 240, g: 10, b: 10, a: 1 },
                TimeStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontSize: '25'
                },
                hands: {
                    hourhandcolor: {
                        r: 255, g: 0, b: 0, a: 1
                    },
                    minutehandcolor: {
                        r: 0, g: 128, b: 0, a: 1
                    },
                    secondhandcolor: {
                        r: 165, g: 42, b: 42, a: 1
                    }
                },
                selectedTimeZoneItem: ConstantValues.timezoneList[0],
                isAnalog: true,
                timezoneid: ConstantValues.timezoneList[0].value,
                timezoneLabel: ConstantValues.timezoneList[0].label,
                selectedHoursFormat: _.first(ConstantValues.hoursFormat),
                selectedTimeFormat: _.first(ConstantValues.timeFormat),
                isd: false, // TODO: what is this
                selectedDateFormat: _.first(ConstantValues.dateFormats),
                displayDate: false,
                displayDays: true,
                tzoneText: ''
            };

        case WidgetType.CircularProgress:
            return {
                x: 1, y: 1, width: 300, height: 300, z: zIndex,
                id: Date.now() + Math.floor(Math.random() * 10000) + 1,
                widgetType: WidgetType.CircularProgress,
                showSettings: false,
                showEditor: false,
                showIcons: true,
                min: 0,
                max: 100,
                value: 0,
                displayValue: '0',
                title: "<< Not Configured >>",
                refreshInterval: '',
                showMaxValueOnWidget: false,
                titleStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: '12'
                },
                valueStyles: {
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    },
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                appliedBackgroundColor: {
                    r: 0, g: 192, b: 239, a: 1
                },
                widgetBody: {
                    backgroundColor: {
                        r: 0, g: 192, b: 239, a: 1
                    },
                    color: {
                        r: 0, g: 0, b: 0, a: 1
                    }
                },
                appliedSettings:
                    {
                        filters: [
                        ],
                        dataMetrics:
                            {
                            },
                        thresholds: [
                        ]
                    }

            };
        default:
            return {};
    }
}

export function MapPropertiesForExistedMatrixWidget(newMatrix, oldMatrix) {
    let newRowCount = newMatrix.length;
    let newMatArr = _.flatten(newMatrix);
    let oldMatArr = _.flatten(oldMatrix);

    for (var index = 0; index < oldMatArr.length; index++) {
        var oMatObj = oldMatArr[index];
        let newindex = _.findIndex(newMatArr, (nMatObj) => {
            return nMatObj.widgetType === oMatObj.widgetType && _.isEqual(nMatObj.settings, oMatObj.settings)
        });
        if (newindex > -1 && newindex < newMatArr.length) {
            if (newMatArr[newindex].widgetType === WidgetType.Text) {
                newMatArr[newindex].titleStyles = _.cloneDeep(oMatObj.titleStyles);
            }
            else if (newMatArr[newindex].widgetType === WidgetType.Box) {
                newMatArr[newindex].titleStyles = _.cloneDeep(oMatObj.titleStyles);
                newMatArr[newindex].appliedSettings.thresholds = _.cloneDeep(oMatObj.appliedSettings.thresholds);
                newMatArr[newindex].valueStyles = _.cloneDeep(oMatObj.valueStyles);
                newMatArr[newindex].widgetBody = _.cloneDeep(oMatObj.widgetBody);
                newMatArr[newindex].appliedBackgroundColor = _.cloneDeep(oMatObj.appliedBackgroundColor);
            }
            else if (newMatArr[newindex].widgetType === WidgetType.Progress) {
                newMatArr[newindex].titleStyles = _.cloneDeep(oMatObj.titleStyles);
                newMatArr[newindex].appliedSettings.thresholds = _.cloneDeep(oMatObj.appliedSettings.thresholds);
                newMatArr[newindex].valueStyles = _.cloneDeep(oMatObj.valueStyles);
                newMatArr[newindex].widgetBody = _.cloneDeep(oMatObj.widgetBody);
                newMatArr[newindex].min = _.cloneDeep(oMatObj.min);
                newMatArr[newindex].max = _.cloneDeep(oMatObj.max);
                newMatArr[newindex].appliedBackgroundColor = _.cloneDeep(oMatObj.appliedBackgroundColor);
            }
            else {
                newMatArr[newindex].titleStyles = _.cloneDeep(oMatObj.titleStyles);
                newMatArr[newindex].appliedSettings.thresholds = _.cloneDeep(oMatObj.appliedSettings.thresholds);
                newMatArr[newindex].valueStyles = _.cloneDeep(oMatObj.valueStyles);
                newMatArr[newindex].widgetBody = _.cloneDeep(oMatObj.widgetBody);
                newMatArr[newindex].segmentColors = _.cloneDeep(oMatObj.segmentColors);
                newMatArr[newindex].min = _.cloneDeep(oMatObj.min);
                newMatArr[newindex].max = _.cloneDeep(oMatObj.max);
                newMatArr[newindex].appliedBackgroundColor = _.cloneDeep(oMatObj.appliedBackgroundColor);
            }
        }
    }
    return _.flatten(_.chunk(newMatrix, newMatrix.length / newRowCount));
}