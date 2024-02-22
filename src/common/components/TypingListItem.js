import React, {Component, PropTypes} from 'react'
const TypingListItem=(props)=>{
    const {username} =props
    return (
        <span>
            {username}
        </span>
    )
}
TypingListItem.proptypes={
    username: Prop.Types.string.isRequired
}
export default TypingListItem