import React from "react";
import Avatar from 'react-avatar';
import RobotAvatar from '../../assets/robot.jpg'
import { BubbleWrapper } from "./bubblestyle";
import { BubbleProps } from "./props";
import { CSSProperties } from "styled-components";
import { useAuth0 } from "../../hooks/auth0-hook";

const regularStyles = {
    width: '100%',
    paddingBottom: 10,
}
const rightStyles: CSSProperties = {
    ...regularStyles,
    float: 'right'
}
const leftStyles: CSSProperties = {
    ...regularStyles,
    float: 'left',
    marginLeft: 10,
}

const Bubble: React.FC<BubbleProps> = ({
  user,
  children,
}) => {
    const { user: profile } = useAuth0()
    return (
        <div style={user ? rightStyles : leftStyles}>
            <div style={{ float: user ? 'right' : 'left' }}>
                {!user && <Avatar style={{ border: '1px solid black' }} size="45px" round src={RobotAvatar} />}
                <BubbleWrapper user={user}>{children}</BubbleWrapper>
                {user && <Avatar style={{ border: '1px solid black' }} size="45px" round name={profile.name} src={profile.picture} />}
            </div>
        </div>
    )
};

export default Bubble;
