const getIceServers = async () => {
   const response = await fetch(
      "https://nomineelife.metered.live/api/v1/turn/credentials?apiKey=3001f0c80c86f26df37eba4cb20bbcd9a3eb	"
   );
   const iceServers = await response.json();
   return iceServers;
};

export default getIceServers;
