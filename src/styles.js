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
    navy:{
        backgroundColor: '#003080'
    },
    main:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        color: '#ffffff',
        overflow: 'auto'
    },
    center:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    largeLogo: {
        height: 100
    }, 
    logo:{
        height: 50
    },
    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        margin: 10,
    },
    title: {
        marginTop: 18
    },
    space: {
        padding: 10,
    },
    media:{
        width: 200
    }
});