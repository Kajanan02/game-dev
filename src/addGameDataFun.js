import axios from "axios";

export default function addGameDataFun({gameType, level, score, timeTaken,}) {

    axios.post("http://localhost:5000/api/users/addGameData", {
        gameType,
        level,
        score,
        timeTaken,
        userId: localStorage.getItem("userId")
    }).then((res) => {
        console.log(res.data);

    }).catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again later.");
    })

}