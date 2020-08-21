var classificationAnalysisTemplate = `<div class="classification-analysis-window">
    <div class="close-area">
        <button class="analysis-close-btn">
            <span id="analysis-file-name"></span>
            <img src="../resources/imgs/annotti_trash.png" alt="close">
        </button>
    </div>
    <div class="classification-analysis-contents">
        <h1 align='center'># of datas for each label</h1>
        <canvas class="analytic-chart" id="classification-chart"></canvas>
    </div>
</div>`;

module.exports = { classificationAnalysisTemplate };
