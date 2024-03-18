import styles from './WrapperCenter.module.css'
export default function WrapperCenter(props){
    return(
        <div className={styles.wrapper}>
            {props.children}
        </div>
    )
}