let userStream: MediaStream|null = null

export const getStream = async (userVideo: any) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })

    userVideo.current.srcObject = stream
    userStream = stream;
    
    return stream
}

export const stopStream = () => {
    userStream?.getTracks().forEach((track) => track.stop())
}

export const toggleMic = () => {
    userStream?.getAudioTracks().forEach((track) => track.enabled = !track.enabled)
}

export const toggleVideo = () => {
    userStream?.getVideoTracks().forEach((track) => track.enabled = !track.enabled)
}
