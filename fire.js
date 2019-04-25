const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const firePixelArray = []
const fireHeight = 50
const fireWidth = 50



function start(){
    createFireDataStructure()
    createFireSource()
    renderFire()
    setInterval(calculateFirePropagation, 100)

}

function createFireDataStructure(){
    let numberOfPixels = fireWidth * fireHeight
    for(let i = 0; i< numberOfPixels; i++){
        firePixelArray[i] = 0;
    }
}

function calculateFirePropagation(){
    for(let col = 0; col < fireWidth; col++){
        for(let row = 0; row < fireHeight; row ++){
            const pixelIndex = col + (row * fireWidth)
            updateFire(pixelIndex)
        }
    }
    renderFire()

}

function updateFire(currentPixel) {

    const decay = Math.floor(Math.random() * 3)
    const bellowPixelIndex = currentPixel + fireWidth;
    if (bellowPixelIndex >= fireWidth * fireHeight) {
        return
    }
    const bellowFireIntensity = firePixelArray[bellowPixelIndex]
    const newFireIntensity = bellowFireIntensity - decay >= 0 ? bellowFireIntensity - decay : 0
    firePixelArray[currentPixel + decay] = newFireIntensity
}


function renderFire(){
    const debug = false
    let html = '<table cellpadding="0" cellspacing="0">'
    for (let row = 0; row < fireHeight; row ++){
        html += '<tr>'
        for(let col = 0; col < fireWidth; col ++){
            let pixelIndex = col + (row * fireWidth)
            const fireIntensity = firePixelArray[pixelIndex]
            if(debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            } else{
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r}, ${color.g}, ${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource(){
    for (let col = 0; col < fireWidth; col ++){
        let overFlowPixelIndex = fireWidth * fireHeight
        const pixelIndex = ( overFlowPixelIndex - fireWidth ) + col
        firePixelArray[pixelIndex] = 36;
    }
}

start()