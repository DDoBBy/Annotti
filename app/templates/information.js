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
                <div class="event">Label</div>
            </div>
            <div class="desc">
                <div>Create label.</div>
                <div class="desc-gif"><img src="../resources/gifs/create_label.gif" style="width:50%"></img></div>
                <div>Delete label.</div>
                <div class="desc-gif"><img src="../resources/gifs/delete_label.gif" style="width:50%"></img></div>
                <div>Change label.</div>
                <div class="desc-gif"><img src="../resources/gifs/change_color.gif" style="width:50%"></img></div>
            </div>
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
                <div>Show the overall statistics of images and labels.</div>
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
                <div class="desc-gif"><img src="../resources/gifs/classification_sunflower.gif"></div>
            </div>
        </div>
    </div>
    <div class="information-area">
        <div class="information-title">Object Detection</div>
        <div class="information-table">
            <div class="keyboard">
                <div class="key">alt</div>
                <div class="plus">+</div>
                <div class="event">Drag</div>
            </div>
            <div class="desc">
                <div>Create bounding box on the image with activated label.</div>
                <div class="desc-gif"><img src="../resources/gifs/detection_road.gif"></div>
            </div>
            <div class="keyboard">
                <div class="event">Click</div>
                <div class="plus">+</div>
                <div class="key">d</div>
            </div>
            <div class="desc">
                <div>Delete the clicked box.</div>
                <div class="desc-gif"><img src="../resources/gifs/delete_box.gif"></div>
            </div>
        </div>
    </div>
</div>
</div>`;

module.exports = { InformationTemplate };
