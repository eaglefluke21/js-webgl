import kaplay from "kaplay";

const k = kaplay
({
  width: 1180,
  height: 720,
  global:false,
  touchToMouse:true,
  buttons:{
    jump:{
        keyboard:["space"],
        mouse:"left",
    }
  },
  debugKey:"d",
  debug:true,
});
   
export default k;