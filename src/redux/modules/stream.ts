const INITIALIZE_STREAM = "INITIALIZE_STREAM";
const TOGGLE_MIC = "TOGGLE_MIC";
const TOGGLE_VIDEO = "TOGGLE_VIDEO";
const RESET_STREAM = "RESET_STREAM";

export const initializeStream = (ref: any) => ({
    type: INITIALIZE_STREAM,
    payload: ref
});

export const toggleMic = (payload: boolean) => ({
    type: TOGGLE_MIC,
    payload 
});

export const toggleVideo = (payload: boolean) => ({
    type: TOGGLE_VIDEO,
    payload
});

export const resetStream = () => ({
    type: RESET_STREAM
})

interface StreamState {
    mic: boolean;
    video: boolean;
    stream: MediaStream | null;
}


const initialState: StreamState = {
    mic: true,
    video: true,
    stream: null
};

export const streamReducer = async (state = initialState, action: any) => {
    switch (action.type) {
        case INITIALIZE_STREAM:
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            action.payload.current.srcObject = mediaStream
            return {
                ...state,
                stream: mediaStream
            };
        case TOGGLE_MIC:
            state.stream?.getAudioTracks().forEach(track => track.enabled = action.payload);
            return {
                ...state,
                mic: action.payload
            };
        case TOGGLE_VIDEO:
            console.log(state.stream);
            
            state.stream?.getVideoTracks().forEach(track => track.enabled = action.payload);
            return {
                ...state,
                video: action.payload
            };
        case RESET_STREAM:
            if (state.stream instanceof MediaStream) {
               state.stream.getTracks().forEach((track) => track.stop());
            }
            return {
                ...state,
                stream: null
            }
        default:
            return state;
    }
}

