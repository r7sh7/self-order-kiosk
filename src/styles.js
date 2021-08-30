import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    red:{
        backgroundColor: '#ff2040',
        color: '#ffffff'
    },
    green:{
        backgroundColor: '#00b020'
    },
    main:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        color: '#ffffff'
    },
    center:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    largeLogo: {
        height: 100
    }
});