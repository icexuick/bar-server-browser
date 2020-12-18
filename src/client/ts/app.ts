import "../styles/styles.scss";

import "iframe-resizer/js/iframeResizer.contentWindow";

import Vue from "vue";
import BattleComponent from "components/battle.vue";
import { Battle } from "common/model/battle";

declare var __IS_DEV__: boolean;

const insideIframe = window !== window.parent;

if (__IS_DEV__ || !insideIframe) {
    document.body.classList.add("dev");
}

const vue = new Vue({
    el: "#vue",
    template: `
    <div v-if="battles && !battles.length" class="empty">
        No active battles 😞
    </div>
    <div v-else class="battles">
        <battle-component v-for="battle in battles" :battle="battle" v-bind:key="battle.battleId" />
    </div>
    `,
    data: {
        battles: undefined as Battle[] | undefined
    },
    components: {
        BattleComponent
    },
    methods: {
        listenForBattleUpdates() {
            return new Promise<void>(resolve => {
                const ws = new WebSocket(`wss://${location.href.split("\/\/")[1]}`);

                ws.onopen = event => console.log("Connected to WebSocket");
                ws.onmessage = event => {
                    const battles = JSON.parse(event.data) as Battle[];
                    this.battles = battles.sort((a, b) => b.players.length - a.players.length);
                    console.log(battles);
                    resolve();
                };
            });
        }
    },
    async beforeMount () {
        await this.listenForBattleUpdates();
    }
});