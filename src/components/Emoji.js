import React, { useEffect, useState } from 'react'
import load from '../assets/load.gif'
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
// import { Picker } from 'emoji-mart'
import '../sass/emoji.scss'
import Picker from 'emoji-picker-react';
defineLordIconElement(loadAnimation);
function Emoji({handleDataChat, checkEmoji, handleCheckEmoji}) {
    //emoji
    const onEmojiClick = (event, emojiObject) => {
        handleDataChat(emojiObject.emoji)
    };
     //check pick emoji
    
return (
    <div className='emoji' >
        <lord-icon
            src="https://cdn.lordicon.com/pithnlch.json"
            trigger="hover"
            onClick={handleCheckEmoji}
            >
        </lord-icon>
        {
            checkEmoji &&
                <Picker
                    onEmojiClick={onEmojiClick}
                    groupVisibility={{
                        flags: false,
                        food_drink: false,
                        travel_places: false,
                        activities: false,
                        objects: false,
                        symbols: false,
                        animals_nature: false,
                        recently_used:false
                    }}
                    // preload
                    // disableAutoFocus
                    // disableSearchBar
                    // disableSkinTonePicker
                />
        }
    </div>
)
}

export default Emoji