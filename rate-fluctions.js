// 補正値
class CorrectValueService {

    correctValueMap = new Map();

    constructor() {
        this.correctValueMap.set(0, 45);
        this.correctValueMap.set(1, 40);
        this.correctValueMap.set(2, 35);
        this.correctValueMap.set(3, 25);
        this.correctValueMap.set(4, 20);
        this.correctValueMap.set(5, 15);
        this.correctValueMap.set(6, 2);
    }

    // 自レートから補正値を取得する
    getCorrectValue(rate) {
        let stage = Math.floor(rate / 1000);
        return this.correctValueMap.get(stage);
    }
}

// レート変動
class RateFluctuationService {

    correctValueService = new CorrectValueService();

    // 対戦相手のレート下限と対戦後の自レートを計算する
    calcurateHigherRateFluctuations(rate, count) {
        let rateFluctuationList = new Array();
        if (rate == 0) {
            rateFluctuationList.unshift(new RateFluctuation(0, 162));
            return rateFluctuationList;
        } else if (rate < 162) {
            throw "Input value \"" + rate + "\" is invalid.";
        }
        let correctValue = this.correctValueService.getCorrectValue(rate);
        let currentExpectedRate = 0;
        for (let i = rate; i <= rate + 200; i++) {
            let expectedRate = Math.floor(rate + 50 + correctValue * i / rate);
            if (expectedRate > currentExpectedRate) {
                rateFluctuationList.unshift(new RateFluctuation(i, expectedRate));
                currentExpectedRate = expectedRate;
            }
        }
        return rateFluctuationList.slice(0, count);
    }
}

class RateFluctuation {

    borderRate = 0;
    expectedRate = 0;

    constructor(borderRate, expectedRate) {
        this.borderRate = borderRate;
        this.expectedRate = expectedRate;
    }
}

const rateFluctuationService = new RateFluctuationService();

function simulateRateFluctuations(rate) {
    let rateFluctuationList = rateFluctuationService.calcurateHigherRateFluctuations(rate, 5);
    console.log(rateFluctuationList);
    return rateFluctuationList;
}

function simulateIdealRateFluctuations(rate) {
    let currentExpectedRate = rate;
    const expectedRateFluctuationList = new Array();
    for (let i = 0; i < 10; i ++) {
        let rateFluctuation = rateFluctuationService.calcurateHigherRateFluctuations(currentExpectedRate, 1).shift();
        expectedRateFluctuationList.push(rateFluctuation);
        currentExpectedRate = rateFluctuation.expectedRate;
    }
    console.log(expectedRateFluctuationList);
    return expectedRateFluctuationList;
}
