import React from "react";
import '../../CSS/BasicGuideButton.css'

class BasicGuideButton extends React.Component {
    constructor(props)
    {
        super()
    }
    render()
    {
        return(
            <div>
                <h2> Need Help? Our interactive guide can help you pick</h2>
                <button>Try it out</button>
            </div>
        );
    }
}
export default BasicGuideButton