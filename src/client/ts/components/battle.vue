<template>
    <div class="battle">
        <div class="battle__top">
            <div class="battle__founder">
                {{battle.founder}}
            </div>
            <div class="battle__title">
                {{battle.title}}
            </div>
            <div class="battle__player-count">
                {{totalPlayers}} / {{battle.maxPlayers}}
            </div>
        </div>
        <div class="battle__players">
            <div class="battle__player" v-for="player in battle.players" v-bind:key="player.userId">
                {{player.username}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// export interface Battle {
//     battleId: number;
//     founder: string;
//     ip: string;
//     port: number;
//     maxPlayers: number;
//     passworded: boolean;
//     locked: boolean;
//     rank: number;
//     map: string;
//     mapHash: number;
//     title: string;
//     game: string;
//     spectators: number;
//     players: { [username: string]: Player };
// }
// export interface Player {
//     userId: number;
//     username: string;
//     country: string;
//     status?: PlayerStatus;
//     battleId?: number;
// }

import Vue from "vue";
import { Battle } from "../../../common/model/battle";
import { Player } from "../../../common/model/player";

export default Vue.extend({
    props: {
        battle: {
            type: Object
        }
    },
    computed: {
        totalPlayers() : number {
            const battle = this.battle as Battle;
            return battle.players.length + battle.spectators
        }
    }
});
</script>