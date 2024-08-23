import { Instance as SimplePeerInstance } from "simple-peer";

// actionTypes.ts
const SET_PEER = "INITIALIZE_PEER";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

export const setPeer = (peer: SimplePeerInstance) => ({
   type: SET_PEER,
   payload: peer,
});

export const setLoading = (isLoading: boolean) => ({
   type: SET_LOADING,
   payload: isLoading,
});

export const setError = (error: string | null) => ({
   type: SET_ERROR,
   payload: error,
});


interface PeerState {
   isLoading: boolean;
   error: string | null;
   peer: SimplePeerInstance | null;
}

const initialState: PeerState = {
   peer: null,
   isLoading: false,
   error: null,
};

export const peerReducer = (state = initialState, action: any): PeerState => {
   switch (action.type) {
      case SET_PEER:
         return {
            ...state,
            peer: action.payload,
         };

      case SET_LOADING:
         return {
            ...state,
            isLoading: action.payload,
         };
      case SET_ERROR:
         return {
            ...state,
            error: action.payload,
         };
      default:
         return state;
   }
};
