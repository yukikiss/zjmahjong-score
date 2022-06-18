var data = {
    names : ["", "", "", ""],
    records : [[], [], [], []],
    results : [0, 0, 0, 0]
}

btnRecord(0,1,20)
btnRecord(1,-1,100)
btnRecord(1,0,200)
btnUndo()
btnUndo()
btnUndo()

function btnRecord(playerFrom, playerTo, baseScore){
    let scoreChange = computeScore(playerFrom, playerTo, baseScore)
    addRecord(scoreChange)
    saveData()
    render()
}
function btnUndo(){
    undoRecord()
    saveData()
    render()
}

function computeScore(playerFrom, playerTo, score){
    // playerFrom = player who finished their hand (0,1,2,3)
    // playerTo = player to bear the cost, -1 if tsumo (-1,0,1,2,3)
    // score = base score for the hand
    let gain = score * 3
    let lossTsumo = score
    let lossSmall = Math.min(score, 25)
    let lossBig = gain - lossSmall * 2

    let temp = [0, 0, 0, 0]
    for (var i = 0; i <= 3; i++){
        if (i == playerFrom){
            temp[i] = gain
        } else if (playerTo == -1){
            temp[i] = -1 * lossTsumo
        } else if (i == playerTo){
            temp[i] = -1 * lossBig
        } else {
            temp[i] = -1 * lossSmall
        }
    }
    return temp
}

function addRecord(sList){
    for (var i = 0; i <= 3; i++){
        data.records[i].push(sList[i])
        data.results[i] += sList[i]
    }
}

function undoRecord(){
    for (var i = 0; i <= 3; i++){
        data.results[i] -= data.records[i].pop()
    }
}


function saveData(){
    let jsonString = JSON.stringify(data)
    document.cookie = "d=" + jsonString;
}

function loadData(){
    return JSON.parse(document.cookie.replace("d=", ""))
}

function render(){
    let recordRoot = document.getElementById("record")
    recordRoot.innerHTML = ""
    let recordCount = data.records[0].length
    for (var i = 0; i< recordCount; i++){
        recordRoot.innerHTML += makeDataRowHtml(data.records[0][i],data.records[1][i],data.records[2][i],data.records[3][i])
    }
    recordRoot.innerHTML += makeHeaderRowHtml(data.results[0], data.results[1], data.results[2], data.results[3])
}
function makeDataRowHtml(s0,s1,s2,s3){
    return `<tr><td>${s0}</td><td>${s1}</td><td>${s2}</td><td>${s3}</td></tr>`
}
function makeHeaderRowHtml(s0,s1,s2,s3){
    return makeDataRowHtml(s0,s1,s2,s3).replaceAll("td", "th")
}