// テーブル内部HTML
class TableInnerHtmlService {

    simulateRateFluctuationService = new SimulateRateFluctuationService(); 

    // TODO シュミレートタイプによる分岐を改善できるか？
    create(simulateType, currentRate) {
        switch (simulateType) {
            case 0:
                let rateFluctuationList = this.simulateRateFluctuationService.simulateRateFluctuationList(currentRate);
                let tableInnerHtml0 = "<thead><tr><th>相手（下限）</th><th>勝利後</th></tr></thead><tbody>";
                for (let i in rateFluctuationList) {
                    let rateFluctuation = rateFluctuationList[i];
                    tableInnerHtml0 += "<tr><td>" + rateFluctuation.borderRate + "</td><td>" + rateFluctuation.expectedRate + "</td></tr>";
                }
                tableInnerHtml0 += "</tbody>";
                return tableInnerHtml0;
            case 1:
                let continuousHighestRateFluctuationList = this.simulateRateFluctuationService.simulateContinuousHighestRateFluctuationList(currentRate);
                let tableInnerHtml1 = "<thead><tr><th>回数</th><th>相手（下限）</th><th>勝利後</th></tr></thead><tbody>";
                for (let i in continuousHighestRateFluctuationList) {
                    let rateFluctuation = continuousHighestRateFluctuationList[i];
                    tableInnerHtml1 += "<tr><td>" + (parseInt(i) + 1) + "</td><td>" + rateFluctuation.borderRate + "</td><td>" + rateFluctuation.expectedRate + "</td></tr>";
                }
                tableInnerHtml1 += "</tbody>";
                return tableInnerHtml1;
            default:
                throw "シュミレーションを正しく入力してください。";
        }
    }
}

// テーブル
class TableService {

    dom;

    constructor(dom) {
        this.dom = dom;
    }

    update(innerHtml) {
        this.dom.innerHTML = innerHtml;
    }
}

// シミュレートタイプフォーム
class SimulateTypeFormService {

    simulateTypeDom;

    constructor(simulateTypeDom) {
        this.simulateTypeDom = simulateTypeDom;
    }

    setValue(simulateType) {
        this.simulateTypeDom.options.selectedIndex = simulateType;
    }
}

// 現在レートフォーム
class CurrentRateFormService {

    currentRateDom;

    constructor(currentRateDom) {
        this.currentRateDom = currentRateDom;
    }

    setValue(currentRate) {
        this.currentRateDom.value = currentRate;
    }
}
