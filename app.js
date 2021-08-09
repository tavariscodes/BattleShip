class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull || Math.floor((Math.random() * 4) + 3);
        this.firepower = firepower ||  Math.floor((Math.random() * 3) + 2);   // rand val btwn 2 - 4
        this.accuracy = accuracy || (Math.floor(Math.random() * 3) + 6) / 10; // rand val btwn .6-.8
    }

    attack(ship) {
        let chanceToHit = Math.random();
        if (this.accuracy >= chanceToHit) {
            // attack successful
            ship.hull -= this.firepower;
            alert(`${ship.name} has been HIT`)
        } else { 
            alert(`Missed ${ship.name}`)
        }
    }
}

const promptUser = (enemyCount) => {
    let userResponse = ""
    while(true) {
        userResponse = prompt(`${enemyCount} enemies remaining; do you want to attack or retreat?`);
        if (userResponse.toLowerCase().trim() === 'retreat' || userResponse.toLowerCase().trim() === 'attack') {
            break
        }
        else { 
            alert("INVALID INPUT!")
        }
    }
    return userResponse
}

const gameRound = () => {
    // initialize my ship
    const USSchwarzenegger = new Ship('USSchwarzenegger', 20, 5, 0.7);
    // create enemy ships
    let enemyShips = [];
    for ( var x = 0; x < 6; x++ ) {
        enemyShips.push(new Ship('AlienShip'));
    }
    // attack ships until dead, or no more enemies
    while ( enemyShips.length !== 0 ) {
        if ( USSchwarzenegger.hull > 0 ) {  // while my ship still alive
            USSchwarzenegger.attack(enemyShips[0]); // attack first ship
            if ( enemyShips[0].hull > 0 ) {
                enemyShips[0].attack(USSchwarzenegger);
            } else {
                enemyShips.shift();
                if (enemyShips.length === 0) { alert("YOU WIN! no more enemy ships remain!"); break }
                let userResponse = promptUser(enemyShips.length);
                if ( userResponse === 'retreat' ) {
                    alert('YOU LOSE! You retreat..')
                    break
                } else if ( userResponse === 'attack' ) {
                    continue
                }
            }
        } else {
            alert("YOU LOSE! You have been defeated!")
            break
        }
    }
} 

// start game round
gameRound()

