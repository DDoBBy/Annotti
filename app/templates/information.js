var InformationTemplate = `<div class="information-window">
<div class="close-area">
    <h1 align='center'>Information</h1>
    <button class="information-close-btn">
        <img src="../resources/imgs/annotti_trash.png" alt="close">
    </button>
</div>
<div class="information-contents">
    <div class="information-area">
        <div class="information-title">Common</div>
        <div class="information-table">
            <div class="keyboard">
                <div class="button-event">
                    <img src="../resources/imgs/annotti_directory.png"></img>
                </div>
            </div>
            <div class="desc">
                <div>Go back to the folder.</div>
                <div class="desc-gif">
                    
                </div>
            </div>
            <div class="keyboard">
                <div class="button-event">
                    <img src="../resources/imgs/annotti_statistic.png"></img>
                </div>
            </div>
            <div class="desc">
                <div>Shows the overall statistics of images and labels.</div>
                <div class="desc-gif">
                    <img src="../resources/gifs/classification_analysis.gif"></img>
                </div>
            </div>
            <div class="keyboard">
                <div class="button-event">
                    <img src="../resources/imgs/annotti_export.png"></img>
                </div>
            </div>
            <div class="desc">
                <div>Export the result in JSON format.</div>
                <div class="desc-gif"></div>
            </div>
        </div>
    </div>
    <div class="information-area">
        <div class="information-title">Classification</div>
        <div class="information-table">
            <div class="keyboard">
                <div class="event">Click thumbnail</div>
            </div>
            <div class="desc">
                <div>View the enlarged image.</div>
                <div class="desc-gif"><img src="../resources/gifs/classification_zoom.gif"></img></div>
            </div>
            <div class="keyboard">
                <div class="event">Scroll image</div>
            </div>
            <div class="desc">
                <div>Zoom in/out the image.</div>
                <div class="desc-gif"><img src="../resources/gifs/classification_zoom_scroll.gif"></img></div>
            </div>
            <div class="keyboard">
                <div class="key">alt</div>
                <div class="plus">+</div>
                <div class="event">Click / Drag</div>
            </div>
            <div class="desc">
                <div>Labeling images with activated label.</div>
                <div class="desc-gif"></div>
            </div>
        </div>
    </div>
</div>
</div>`;

module.exports = { InformationTemplate };
