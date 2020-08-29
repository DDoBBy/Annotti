var detectionAnalysisTemplate = `<div class="detection-analysis-window">
    <div class="close-area">
        <button class="analysis-close-btn">
            <span id="analysis-file-name"></span>
            <img src="../resources/imgs/annotti_trash.png" alt="close">
        </button>
    </div>
    <div class="detection-analysis-contents">
        <h1 align='center'># of boxes for each label</h1>
        <canvas class="analytic-chart" id="detection-chart"></canvas>
    </div>
</div>`;

module.exports = { detectionAnalysisTemplate };
