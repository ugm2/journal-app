// src/utils/generateWordCloudHtml.js
const generateWordCloudHtml = (wordsArray) => {
    const scriptSrc = "https://d3js.org/d3.v5.min.js";
    const cloudScriptSrc = "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js";
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>body { margin: 0; overflow: hidden; }</style>
            <script src="${scriptSrc}"></script>
            <script src="${cloudScriptSrc}"></script>
        </head>
        <body>
            <div id="word-cloud"></div>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const words = ${JSON.stringify(wordsArray)};
                    if (!words.length) {
                        console.error('Words array is empty');
                        return;
                    }

                    const layout = d3.layout.cloud()
                        .size([window.innerWidth, window.innerHeight])
                        .words(words)
                        .padding(5)
                        .rotate(() => ~~(Math.random() * 2) * 90)
                        .font("Impact")
                        .fontSize(d => Math.max(10, Math.min(d.size, 100))) // Ensure font size is within a reasonable range
                        .on("end", draw);

                    layout.start();

                    function draw(words) {
                        const svg = d3.select("#word-cloud").append("svg")
                            .attr("width", layout.size()[0])
                            .attr("height", layout.size()[1])
                            .append("g")
                            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")");
                        svg.selectAll("text")
                            .data(words)
                            .enter().append("text")
                            .style("font-size", d => d.size + "px")
                            .style("font-family", "Impact")
                            .attr("text-anchor", "middle")
                            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                            .text(d => d.text);
                    }
                });
            </script>
        </body>
        </html>
    `;
};

export default generateWordCloudHtml;
