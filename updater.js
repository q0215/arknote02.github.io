// テーブル内部HTML
class TableInnerHtmlService {

    simulateRateFluctuationService = new SimulateRateFluctuationService(); 

    create(simulateType, currentRate) {
        try {
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
                case 2:
                    let dailyHighestRateList = this.simulateRateFluctuationService.getDailyHighestRateList();
                    let tableInnerHtml2 = "<thead><tr><th>経過日数</th><th>相手（下限）</th><th>天井</th></tr></thead><tbody>";
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
            let tableInnerHtmlError = "<thead><tr><th>メッセージ</th></tr></thead><tbody><tr><td>" + e + "</td></tr></tbody></table>";
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

    clear() {
        this.dom.innerHTML = "";
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
        return this.simulateTypeDom.options[i].value;
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

    disable() {
        //this.currentRateDom.setAttribute("disabled", true);
        this.currentRateDom.readOnly = true;
    }

    enable() {
        //this.currentRateDom.removeAttribute("disabled");
        this.currentRateDom.readOnly = false;
    }
}
