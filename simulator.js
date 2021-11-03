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

// レート変動シュミレーション
class SimulateRateFluctuationService {

    correctValueService = new CorrectValueService();

    // 相手レートの下限と自レートの変動を計算する
    simulateRateFluctuationList(rate) {
        let rateFluctuationList = new Array();
        if (rate == 0) {
            rateFluctuationList.unshift(new RateFluctuation(0, 162));
            return rateFluctuationList;
        } else if (rate < 162) {
            throw "現在のレートを正しく入力してください。";
        }
        let correctValue = this.correctValueService.getCorrectValue(rate);
        let currentExpectedRate = 0;
        for (let i = rate - 200; i <= rate + 200; i++) {
            if (i < 0) {
                continue;
            }
            let expectedRate = Math.floor(rate + 50 + correctValue * i / rate);
            if (expectedRate > currentExpectedRate) {
                rateFluctuationList.unshift(new RateFluctuation(i, expectedRate));
                currentExpectedRate = expectedRate;
            }
        }
        return rateFluctuationList;
    }

    // 10回連続で相手レートの下限と自レートの変動を計算する
    simulateContinuousHighestRateFluctuationList(rate) {
        let continuousHighestRateFluctuationList = new Array();
        let currentExpectedRate = rate;
        for (let i = 0; i < 10; i ++) {
            let rateFluctuation = this.simulateRateFluctuationList(currentExpectedRate).shift();
            continuousHighestRateFluctuationList.push(rateFluctuation);
            currentExpectedRate = rateFluctuation.expectedRate;
        }
        return continuousHighestRateFluctuationList;
    }
}

// レート変動
class RateFluctuation {

    borderRate = 0;
    expectedRate = 0;

    constructor(borderRate, expectedRate) {
        this.borderRate = borderRate;
        this.expectedRate = expectedRate;
    }
}
