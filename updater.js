// テーブルヘッダHTML
class TheadHtmlService {

    create(simulateType) {
        switch (simulateType) {
            case 0:
                return "<thead><tr><th>相手（下限）</th><th>勝利後</th></tr></thead>";
            case 1:
                return "<thead><tr><th>回数</th><th>相手（下限）</th><th>勝利後</th></tr></thead>";
            case 2:
                return "<thead><tr><th>日数</th><th>相手（下限）</th><th>天井</th></tr></thead>";
            default:
                return "<thead><tr><th>メッセージ</th></tr></thead>";
        }
    }
}

// テーブル内部HTML
class TbodyHtmlService {

    simulateRateFluctuationService = new SimulateRateFluctuationService(); 

    create(simulateType, currentRate) {
        try {
            switch (simulateType) {
                case 0:
                    let rateFluctuationList = this.simulateRateFluctuationService.simulateRateFluctuationList(currentRate);
                    let tableInnerHtml0 = "<tbody>";
                    for (let i in rateFluctuationList) {
                        let rateFluctuation = rateFluctuationList[i];
                        tableInnerHtml0 += "<tr><td>" + rateFluctuation.borderRate + "</td><td><a href=\"/?t=0&r=" + rateFluctuation.expectedRate + "\">" + rateFluctuation.expectedRate + "</a></td></tr>";
                    }
                    tableInnerHtml0 += "</tbody>";
                    return tableInnerHtml0;
                case 1:
                    let continuousHighestRateFluctuationList = this.simulateRateFluctuationService.simulateContinuousHighestRateFluctuationList(currentRate);
                    let tableInnerHtml1 = "<tbody>";
                    for (let i in continuousHighestRateFluctuationList) {
                        let rateFluctuation = continuousHighestRateFluctuationList[i];
                        tableInnerHtml1 += "<tr><td>" + (parseInt(i) + 1) + "</td><td>" + rateFluctuation.borderRate + "</td><td>" + rateFluctuation.expectedRate + "</td></tr>";
                    }
                    tableInnerHtml1 += "</tbody>";
                    return tableInnerHtml1;
                case 2:
                    let dailyHighestRateList = this.simulateRateFluctuationService.getDailyHighestRateList();
                    let tableInnerHtml2 = "<tbody>";
                    for (let i in dailyHighestRateList) {
                        let rateFluctuation = dailyHighestRateList[i];
                        tableInnerHtml2 += "<tr><td>" + (parseInt(i) + 1) + "</td><td>" + rateFluctuation.borderRate + "</td><td>" + rateFluctuation.expectedRate + "</td></tr>";
                    }
                    tableInnerHtml2 += "</tbody>";
                    return tableInnerHtml2;
                default:
                    throw "指定されたシュミレーションはありません。";
            }
        } catch(e) {
            let tableInnerHtmlError = "<tbody><tr><td>" + e + "</td></tr></tbody>";
            return tableInnerHtmlError;
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

    getValue() {
        let i = this.simulateTypeDom.selectedIndex;
        return parseInt(this.simulateTypeDom.options[i].value);
    }

    addEventListener(eventType, func) {
        this.simulateTypeDom.addEventListener(eventType, func);
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

    getValue() {
        return parseInt(this.currentRateDom.value);
    }

    disable() {
        this.currentRateDom.readOnly = true;
    }

    enable() {
        this.currentRateDom.readOnly = false;
    }
}
