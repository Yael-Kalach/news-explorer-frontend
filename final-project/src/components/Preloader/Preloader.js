import icon from '../../images/icons/Preloader/Icon.svg'

function Preloader( props ) {
    return (
      <div className="preloader">
        <img className="preloader__icon" alt='Website logo' src={icon}></img>
      </div>
    );
  }
  
  export default Preloader;