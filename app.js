new Vue({
    el: '#app',
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function () {
            this.monsterAttacks();

            if (this.checkWin()){
                return;
            }

            this.playerAttacks();

            this.checkWin();
        },
        specialAttack :function () {
            this.monsterAttacks(true);

            if (this.checkWin()){
                return;
            }

            this.playerAttacks(true);
            this.checkWin();
        },
        heal: function () {
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }

            this.monsterAttacks();

        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        logBattle: function (who, dmg, isSpecial) {

            var textNeeded = '';
            if (isSpecial){
                textNeeded = who ? 'Player hits hard Monster for ' + dmg : 'Monster hits hard Player for ' + dmg
            }else{
                textNeeded = who ? 'Player hits Monster for ' + dmg : 'Monster hits Player for ' + dmg
            }
            this.turns.unshift({
                isPlayer: who,
                text: textNeeded
            });
        },
        playerAttacks: function (isSpecial) {
            var damage = isSpecial ? this.calculateDamage(10, 20) : this.calculateDamage(5, 12);
            this.monsterHealth -= damage;

            this.logBattle(true, damage, isSpecial)
        },
        monsterAttacks: function (isSpecial) {
            var damage = isSpecial ? this.calculateDamage(10, 20) : this.calculateDamage(3, 10);
            this.playerHealth -=  damage;

            this.logBattle(false, damage, isSpecial);

        },
        calculateDamage :function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1,min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0){
                if (confirm('You won! New game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if (confirm('You lost! New game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        computed: {
            monsterHP: function () {

            },
            humanHP: function () {

            }
        }
    }
});