import React, { useEffect, useState } from "react";

import "./sass/index.css";

const Insert = props => {
    const [value, setValue] = useState(null);

    return (
        <React.Fragment>
            <div className="insert">
                {
                    props.fields.map((value, idx) => {
                        return <input 
                            key={idx} 
                            type="text" 
                            placeholder={value} 
                            onChange={text => setValue(text.target.value)}
                        />
                    })
                }
            </div>
            <div className="button insert__button">Insereaza</div>
        </React.Fragment>
    )
};

export default Insert;