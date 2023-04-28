import React from 'react';
import YouTube from 'react-youtube';

const Video = (props) => {
    return (
        <YouTube videoId={props.code} className="detail__video"/>
    );
};

export default Video;