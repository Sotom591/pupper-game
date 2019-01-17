import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { SPRITE_SIZE, MONSTER_SIZE } from '../constants.js'
// import FightBar from '../components/FightBar'
import { fetchingPlayer, fetchingMonsters, decMonsterHp } from '../redux/actions';

import PlayerAttackMoves from '../components/PlayerAttackMoves.js'
import PlayerFightCard from '../components/PlayerFightCard.js'
import PlayerHPBar from '../components/PlayerHPBar.js'
import MonsterFightCard from '../components/MonsterFightCard.js'
import MonsterHPBar from '../components/MonsterHPBar.js'




class FightBarCont extends Component{


  componentDidMount(){
    console.log("component mounted")
    this.props.dispatch(fetchingPlayer())
    this.props.dispatch(fetchingMonsters())

  }

checkCollision = () => {
let monsterCoords = this.props.monsters.data.filter(monster =>{
    if(this.props.player.position.x === monster.x && this.props.player.position.y === monster.y){

      return true
    }
  })

return monsterCoords.length > 0
}


checkCollision = () => {
let monsterCoords = this.props.monsters.data.filter(monster =>{
    if(this.props.player.position.x === monster.x && this.props.player.position.y === monster.y){

      return true
    }
  })

return monsterCoords.length > 0
}

dmgMonster = (attack) => {
  // let hitDmg = this.props.monsters.data[1].hp - attack.dmg
  this.props.dispatch(decMonsterHp(2, attack.dmg))
  // console.log(hitDmg)

}


render(){

  return(
  <div>

  {this.checkCollision() ?
  <div
    style={{
      position: 'relative',
      width: '880px',
      height: '240px',
      margin: '5px auto'
    }}
    >
      <div
         className='fightBar'
         style={{
           position: 'relative',
           top: '0px',
           left: '0px',
           width: '880px',
           height: '240px',
           backgroundColor: 'tan',
           border: '4px solid black'
        }}
        >
        <MonsterFightCard/>
        <PlayerAttackMoves dmgMonster={this.dmgMonster} attack={this.props.player.data.player_attacks.filter(attack => attack.id !==3)}/>
        <MonsterHPBar  hp={this.props.monsters.data[0].hp}/>
        <PlayerFightCard/>
        <PlayerHPBar hp={this.props.player.data.hp}/>



      </div>
    </div>
    : null}
    </div>
  )
}

}

const mapStateToProps = (state) =>{
  return {
    player: state.player,
    // noodles: state.noodles,
    monsters: state.monsters
  }
}


export default connect(mapStateToProps)(FightBarCont)
