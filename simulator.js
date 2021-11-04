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
        for (let i = 0; i < 10; i++) {
            let rateFluctuation = this.simulateRateFluctuationList(currentExpectedRate).shift();
            continuousHighestRateFluctuationList.push(rateFluctuation);
            currentExpectedRate = rateFluctuation.expectedRate;
        }
        return continuousHighestRateFluctuationList;
    }

    // 日付天井を計算する
    getDailyHighestRateList() {
        let dailyHighestRateList = new Array(
            new RateFluctuation(1166, 1177),
            new RateFluctuation(2087, 2115),
            new RateFluctuation(2984, 2987),
            new RateFluctuation(3679, 3754),
            new RateFluctuation(4408, 4478),
            new RateFluctuation(5103, 5168),
            new RateFluctuation(5753, 5818),
            new RateFluctuation(6125, 6377),
            new RateFluctuation(6645, 6897),
            new RateFluctuation(7165, 7417)
        );
        return dailyHighestRateList;
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
