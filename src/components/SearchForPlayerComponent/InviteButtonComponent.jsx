import {useState} from "react";

const InviteButtonComponent = ({ initialText, buttonID, specificClassName, style, onClick }) => {
    const [buttonText, setButtonText] = useState(initialText);
    const [buttonStyle, setButtonStyle] = useState(style);

    const handleClick = () => {
        // Notify the parent component
        onClick();
        // Then change the button style and text
        setButtonStyle({
            ...buttonStyle, // Keep the existing styles
            backgroundColor: '#6EBFFF', // Add your new styles
        });
        setButtonText('Invite Sent');
    };

    return (
        <div className={`GeneralButton ${specificClassName}`} id={buttonID} onClick={handleClick} style={buttonStyle}>
            <p>{buttonText}</p>
        </div>
    );
}

export default InviteButtonComponent;
