import React, { useEffect, useState } from 'react';
import './playersdata.css';
export default function PlayersData() {
    // const [teamlist, setTeamlist] = useState([]);
    const [playerlist, setPlayerlist] = useState([]);
    const [searchinput, setSearchinput] = useState("");
    const [filteredplayerlist, setFilteredplayerlist] = useState([])
    useEffect(() => {
        fetch('https://api.npoint.io/20c1afef1661881ddc9c')
            .then((res) => {
                return res.json();
            }).then((response) => {
                // setTeamlist(response.teamsList);
                setPlayerlist(response.playerList);

            })
    }, [])

    function handlechange(e) {
        setSearchinput(e.target.value);
    }


    useEffect(() => {
        const filtereddata = playerlist.filter((val) => {
            return val.PFName.includes(searchinput) || val.TName.includes(searchinput);
        })
        setFilteredplayerlist(filtereddata);
    }, [playerlist, searchinput])


    return (

        <>
            <div className='search-container'>

                <label htmlFor="">Search</label>
                <input className='search-box' type="text" value={searchinput} onChange={handlechange} placeholder="Enter PFName or TName" />
            </div>


            <div className='main-div' >

                {filteredplayerlist.map((players) => {
                    return (
                        <>
                            <div className="card" key={players.Id} >
                                <img src={`./player-images/${players.Id}.jpg`} alt="image is here" id='playerImage' ></img>
                                <div className="container" >
                                    <ul>
                                        <li >{players.PFName}</li>
                                        <li>{players.SkillDesc}</li>
                                        <li> $ {players.Value}</li>
                                    </ul>
                                    <div id="upcoming-match">
                                        <p style={{ color: "maroon" }}>UpComingMatchesList:-</p>{players.UpComingMatchesList.map((matchlist) => {
                                            const date = new Date(matchlist.MDate);
                                            return (
                                                <>
                                                    <div id="upcoming-matches-details">
                                                        
                                                        <p>{matchlist.CCode} <span style={{ color: "red" }}>Vs</span> {matchlist.VsCCode} </p>
                                                   

                                                    <p>{date.toLocaleString("en-IN", {
                                                        timeZone: "UTC",

                                                    })}</p>
                                                     </div>
                                                </>
                                            )
                                        })
                                        }
                                    </div>

                                </div>
                            </div>


                        </>
                    )
                })}
            </div>

        </>
    )
}