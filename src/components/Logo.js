import {useStyles} from "../styles.js"

const Logo = (props) => {
const styles = useStyles();
    return (  
        <img src="/images/logo.png" alt="Logo" className={styles.largeLogo}/>
    );
}
 
export default Logo;