// ビュー制御
class ViewService {

    simulateTypeFormService = new SimulateTypeFormService(document.getElementById("simulate-type"));
    currentRateFormService = new CurrentRateFormService(document.getElementById("current-rate"));
    tableService = new TableService(document.getElementById("result"));
    theadHtmlService = new TheadHtmlService();
    tbodyHtmlService = new TbodyHtmlService();

    constructor(simulateType, currentRate) {
        this.simulateTypeFormService.setValue(simulateType);
        this.currentRateFormService.setValue(currentRate);
        this.simulateTypeFormService.addEventListener("change", (e) => { this.update(); });
    }

    update() {
        const simulateType = this.simulateTypeFormService.getValue();
        const currentRate = this.currentRateFormService.getValue();
        if (simulateType == 2) {
            this.currentRateFormService.disable();
        } else {
            this.currentRateFormService.enable();
        }
        const theadHtml = this.theadHtmlService.create(simulateType);
        const tbodyHtml = this.tbodyHtmlService.create(simulateType, currentRate);
        this.tableService.update(theadHtml + tbodyHtml);
    }
}
