import React from 'react';
import spinnerImg from '../../assets/img/loading-three.jpeg'

let Spinner = () => {
    return(
        <React.Fragment>
            <div>
                <img src={spinnerImg} alt="" className='d-block m-auto' style={{width :'200px' }}></img>
            </div>
        </React.Fragment>
    )
};

export default Spinner;