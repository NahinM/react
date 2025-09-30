import Navbar from "./navbar";

function Games() {

    const games = [
        {
            name: "Tic Tac Toe",
            description: "A classic two-player game where players take turns marking Xs and Os on a 3x3 grid, aiming to get three in a row.",
            link: "/tictactoe"
        },
        {
            name: "Ludo",
            description: "A multiplayer board game where players race their pieces around the board based on dice rolls.",
            link: "/ludo"
        }
    ];

    return (
        <>
        <Navbar />
        <div className="d-flex flex-wrap p-3 gap-3">
            {
                games.map((game) => 
                    <div className="card" style={{ width: "18rem", height: "23rem" }}>
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{game.name}</h5>
                            <p className="card-text">{game.description}</p>
                            <a href={game.link} className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                )
            }
        </div>
        </>
    );
}

export default Games;