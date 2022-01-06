import {
    BsFillPeopleFill,
    BsInfoCircleFill,
    SiInfluxdb,
} from "react-icons/all";
import NewUserForm from "../components/user/NewUserForm";
import Home from "../app/home";
import {Pencil} from "react-bootstrap-icons";
import React from "react";
import {DsynrFormOptions} from "../DSYNR/Form/_/options";

/**
 * @description The default props, values and other datum used in the app, either forms or otherwise.
 */
export const AppOptions = {
    home: {
        screenTitle: 'Home',
        screen: <Home/>,
        ico: <SiInfluxdb/>,
        isVisible: false,
        hasPage: true,
    },

    overview: {
        screenTitle: 'Overview',
        ico: <SiInfluxdb/>,
        summary: {},
    },

    user: {
        screenTitle: 'People',
        screen: 'todo....',
        ico: <BsFillPeopleFill/>,
        new: <NewUserForm/>,
        isVisible: false,
        isNewable: true,
        isNewVisible: false,
        isDirectlyViewable: true,
        options: {},
    },
    notifications: [],
    notification: {
        screenTitle: 'Notifications',
        screen: 'todo....',
        ico: <BsInfoCircleFill/>,
        isVisible: false,
        isPanelVisible: false,
        hasPage: true,
    },

    search: {
    },

    app: {
        currentStatus: '',
        isDataLoaded: false,
        isWorkOffline: false,
    },

    network: {
        connection: null,
        isOnline: true,
        isInfoVisible: false,
    },
    dsynr: {
        logo: 'https://ajain.ca/Dsynr-logo.svg',
        url: 'https://dsynr.com',
    },
    options: { //define only app-independent and publicly applicable common options
        countries: {
            ca: {
                name: 'Canada',
                code: 1,
                province: {
                    ab: 'Alberta',
                    bc: 'British Columbia',
                    mb: 'Manitoba',
                    nb: 'New Brunswick',
                    nl: 'Newfoundland and Labrador',
                    ns: 'Nova Scotia',
                    nt: 'Northwest Territories',
                    nu: 'Nunavut',
                    on: 'Ontario',
                    pe: 'Prince Edward Island',
                    qc: 'Quebec',
                    sk: 'Saskatchewan',
                    yt: 'Yukon'
                }
            }
        },
        userRoles: {
            'administrator': 'Administrator',
            'ghost': 'Ghost',
            'fd': 'Fred Krueger',
            'person': 'Person',
            //...additional roles from CMS are merged once API.opt has loaded
        },
        genders: {
            f: {
                label: 'Female',
                titles: {
                    ms: 'Ms.',
                    mrs: 'Mrs.',
                    fo: 'Other'
                }
            },
            m: {
                label: 'Male',
                titles: {
                    mr: 'Mr.',
                    mo: 'Other'
                }
            },
            o: {
                label: 'Other',
                titles: {
                    'oo': 'Other'
                }
            }
        },
        professions: {
            dr: 'Not a Doctor',
            phy: 'Not a Physician',
            eng: 'The Engineer',
            psy: 'Not a Psychologist',
            o: 'Other'
        }
    },
    FormTypes: {
        user: 'user',
        search: 'search',
    },
}

export const AppFormDefaults = {
    ControlProps: {
        type: DsynrFormOptions.Form.Control.Types.select,
        selfResetTxt: <Pencil/>,
        selfResetCls: undefined,
        selfResetVariant: 'dark',

        options: {},//select only

        cls: 'p-3',

        highlightCls: 'p-3 rounded-3 bg-warning shadow',

        labelCls: 'text-muted',
        isLabelFloating: true,
        isLabelConjoined: false,
        /**
         * @description doesnt hide label when isLabelFloating
         */
        isLabelVisible: true,
        isLabelInline: true, //applies to checkboxes and radios only

        placeholderCls: 'text-muted', //applies only when isLabelFloating (placeholder is shown along _AFormControlExtraInfo instead of inline in control where the label is showing)

        extraInfoCls: 'text-muted opacity-75',

        errorTip: 'Eh!',
        errorCls: 'p-3 mx-5 rounded-3 shadow bg-warning bg-opacity-25 border border-warning', //replaces the control container cls
    }
}

/**
 * The api values will be created using the account domain after the jwt auth token is verified
 * @see setAccApis
 */
export let APIS = {
    'ping': undefined,
    'profile': undefined,
    'pref': undefined,

    'ue': undefined, //userExists (check email to ensure a duplicate user is not added)

    /**
     * @description sup => whats up (updates)
     */
    'sup': undefined,

    'ini': undefined,
    'opt': undefined,

    'search': undefined,

    'add': undefined,

    'users': undefined,
}