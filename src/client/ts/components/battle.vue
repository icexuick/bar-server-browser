<template>
    <div class="battle">
        <div class="battle__background" :style="'--bg: url(images/maps/'+ mapUrl +'.jpg)'"></div>
        <div class="battle__top">
            <div class="battle__title">
                {{battle.title}}
            </div>
            <div class="battle__map">
                {{mapName}}
            </div>
            <div v-if="battle.locked || battle.passworded" class="battle__lock">
                <img src="images/lock.png">
            </div>
            <div class="battle__player-count">
                {{battle.players.length}} / {{battle.maxPlayers}}
            </div>
        </div>
        <div class="battle__players">
            <div class="battle__player" v-for="player in battle.players" v-bind:key="player.userId">
                <div class="battle__flag">
                    <img :src="'images/flags/' + player.country.toLowerCase() + '.png'">
                </div>
                <div class="battle__username">
                    {{player.username}}
                </div>
                <div class="battle__rank">
                    <img v-if="player.status" :src="'images/ranks/' + (player.status.rank + 1) + '.png'">
                    <img v-else src="images/ranks/1.png">
                </div>
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
        mapUrl: function() {
            const battle = this.battle as Battle;
            return battle.map.replace(/\s/g, "_");
        },
        mapName: function() {
            const battle = this.battle as Battle;
            return battle.map.replace(/[\_\-]/g, " ");
        }
    }
});
</script>